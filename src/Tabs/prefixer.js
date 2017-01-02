import Prefixer from 'inline-style-prefixer'

const prefixer = new Prefixer();

export default (styles) => prefixer.prefix(styles);