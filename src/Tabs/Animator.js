const getCurrentMillis = () => new Date().getTime();

export default class Animator {

  constructor(items) {
    this.setItems(items);
    // Give it initial value
    this.containerWidth = 100;
  }

  setItems(items) {
    this.items = items;
  }

  setContainerWidth(containerWidth) {
    this.containerWidth = containerWidth;
  }

  getContainerWidth() {
    return this.containerWidth;
  }

  setBorderWidthRatio(borderWidthRatio) {
    this.borderWidthRatio = borderWidthRatio;
  }

  setSafeMargin(safeMargin) {
    this.safeMargin = safeMargin;
  }

  setInitialTranslation(initialTranslation) {
    this.initialTranslation = initialTranslation;
  }

  setNoFirstLeftPadding(noFirstLeftPadding) {
    this.noFirstLeftPadding = noFirstLeftPadding;
  }

  setNoLastRightPadding(noLastRightPadding) {
    this.noLastRightPadding = noLastRightPadding;
  }

  setResistanceCoeffiecent(resistanceCoeffiecent) {
    this.resistanceCoeffiecent = resistanceCoeffiecent;
  }

  setCurrentTranslateX(translateX) {
    this.currentTranslateX = translateX;
  }

  startDrag() {
    this.startDragMillis = getCurrentMillis();
    this.startTranslateX = this.currentTranslateX;
  }

  endDrag() {
    this.endDragMillis = getCurrentMillis();
  }


  /**
   * Calculate list width from its items
   * @return {number}
   */
  getListWidth() {
    let totalWidth = 0;
    this.items.forEach(item => totalWidth += item.width);
    return totalWidth;
  }

  getFirstItemLeft() {
    return this.items[0].left;
  }

  getItemLeft(item) {
    return this.isFirstItem(item) ? 0 : item.left - this.getFirstItemLeft();
  }

  getItemWidth(item) {
    return item.width;
  }

  getBorderWidth(item) {
    return this.getItemWidth(item) * this.borderWidthRatio;
  }

  /**
   * Return true if the item is the first one in the list
   * @param  {object}  item
   * @return {Boolean}
   */
  isFirstItem(item) {
    return this.items[0] === item;
  }

  /**
   * Return true if the item is the last one
   * @param  {object}  item
   * @return {Boolean}
   */
  isLastItem(item) {
    return this.items.indexOf(item) === this.items.length - 1;
  }

  /**
   * Return true if the list has gone far left
   * @return {Boolean}
   */
  isFarLeft(translateX, useSafeMargin = false) {
    return translateX > (useSafeMargin ? this.safeMargin : 0);
  }

  /**
   * Return true if the list has gone far right
   * @param  {Boolean} useSafeMargin
   * @return {Boolean}
   */
  isFarRight(translateX, useSafeMargin = false) {
    const safeMargin = useSafeMargin ? this.safeMargin : 0;

    // If the newtranslate + window width is more than list width then stop translating
    return (translateX * -1) + this.containerWidth > (this.getListWidth() + safeMargin);
  }

  isListSmallerContainer() {
    return this.getListWidth() < this.containerWidth;
  }

  getFarLeftTranslation(useSafeMargin) {
    return this.initialTranslation + 0 + (useSafeMargin ? this.safeMargin : 0);
  }

  getFarRightTranslation(useSafeMargin) {
    return this.initialTranslation - this.getListWidth() + this.containerWidth - (useSafeMargin ? this.safeMargin : 0);
  }

  checkAndGetTranslateX(translateX, useSafeMargin) {
    if(this.isFarLeft(translateX, useSafeMargin)) {
      return this.getFarLeftTranslation(useSafeMargin);
    }

    if(this.isFarRight(translateX, useSafeMargin)) {
      return this.getFarRightTranslation(useSafeMargin);
    }

    return translateX;
  }

  calculateSwipeNextDistance(deltaX) {
    // Swipping distance
    const di = Math.abs(deltaX);
    // Swipping time
    const ti = this.endDragMillis - this.startDragMillis;
    // Gravity acceleration (constant)
    const g = 9.8;
    // Drag coefficient (constant)
    const u = 0.05;
    // Initial acceleration (from swipping)
    const ai = (2 * di) / (Math.pow(ti, 2));
    // Result acceleration by removing the resistive force
    // since F(resistive) = (drag coefficient) * F(norm)
    // since F(norm) = m * g
    const ar = Math.abs(ai - (g * u)) * -1;
    // Initial velocity (which is the final velocity from the swipping)
    const vi = (2 * di) / ti;
    // We can calculate distance from this equation
    // vf^2 = vi^2 + 2 * ar * distance
    // Now knowing the final velocity is equal to zero (vf = 0)
    const distance = (Math.pow(vi, 2) / (2 * ar)) * -1 * (1 / this.resistanceCoeffiecent);

    return deltaX > 0 ? distance : -1 * distance;
  }

  /**
   * Calculate active item translation
   */
  calculateItemTranslateX(item) {
    if(this.isListSmallerContainer()) {
      return this.currentTranslateX;
    }
    const itemLeft = this.getItemLeft(item);
    const halfContainerWidth = this.containerWidth / 2;
    const halfItemWidth = this.getItemWidth(item) / 2;

    let centerX = this.initialTranslation - itemLeft + halfContainerWidth - halfItemWidth;

    return this.checkAndGetTranslateX(centerX, false);
  }

  calculateSwipeReleaseTranslateX(deltaX) {
    if(this.isListSmallerContainer()) {
      return this.currentTranslateX;
    }
    const distance = this.calculateSwipeNextDistance(deltaX);
    return this.checkAndGetTranslateX(distance + this.currentTranslateX, false);
  }

  calculateBorderTranslateX(item) {
    const itemWidth = this.getItemWidth(item);
    const itemLeft = this.getItemLeft(item);
    const borderWidth = this.getBorderWidth(item);

    // If the first item is active and required not to add left padding for first item
    // then the translateX = itemLeft
    if(this.noFirstLeftPadding && this.isFirstItem(item)) {
      return itemLeft;
    }

    // If the last item is active and required not to add right padding for last item
    // then the translateX = itemLeft + itemWidth - borderWidth
    else if(this.noLastRightPadding && this.isLastItem(item)) {
      return itemLeft + itemWidth - borderWidth;
    }

    // Otherwise then center the border on the element
    // translateX = itemLeft + half itemWidth - half borderWidth
    return itemLeft + (itemWidth / 2) - (borderWidth / 2);
  }

  calculateSwipeTranslateX(deltaX) {
    if(this.isListSmallerContainer()) {
      return this.currentTranslateX;
    }
    return this.checkAndGetTranslateX(deltaX + this.startTranslateX, true);
  }
}