import { generate } from '@ant-design/colors'

// ↓默认颜色
export const primaryColor = '#0960bd'

// ↓默认主题
export const themeMode = 'light'

// ↓主题类型
export type ThemeMode = 'dark' | 'light'

// ↓一个解决临时检查的方法类型
type Fn = (...arg: any) => any

type GenerateTheme = 'default' | 'dark'

// ↓Vite生成颜色组的方法参数，颜色这一块有点深奥了，不做细的研究，感兴趣的同学自己看看源码吧
export interface GenerateColorsParams {
  mixLighten: Fn
  mixDarken: Fn
  tinycolor: any
  color?: string
}

export function generateAntColors(color: string, theme: GenerateTheme = 'default') {
  return generate(color, {
    theme,
  })
}

export function getThemeColors(color?: string) {
  const tc = color || primaryColor
  // ↓传入的颜色根据主题生成10个颜色系列
  const lightColors = generateAntColors(tc)
  // ↓取10个颜色的第6个作为主颜色
  const primary = lightColors[5]
  // ↓再使用主颜色根据主题生成10个颜色系列
  const modeColors = generateAntColors(primary, 'dark')
  // ↓输出这20个颜色
  return [...lightColors, ...modeColors]
}

export function generateColors({
  color = primaryColor,
  mixLighten,
  mixDarken,
  tinycolor,
}: GenerateColorsParams) {
  const arr = new Array(19).fill(0)
  const lightens = arr.map((_t, i) => {
    return mixLighten(color, i / 5)
  })

  const darkens = arr.map((_t, i) => {
    return mixDarken(color, i / 5)
  })

  const alphaColors = arr.map((_t, i) => {
    return tinycolor(color)
      .setAlpha(i / 20)
      .toRgbString()
  })

  const shortAlphaColors = alphaColors.map((item) => item.replace(/\s/g, '').replace(/0\./g, '.'))

  const tinycolorLightens = arr
    .map((_t, i) => {
      return tinycolor(color)
        .lighten(i * 5)
        .toHexString()
    })
    .filter((item) => item !== '#ffffff')

  const tinycolorDarkens = arr
    .map((_t, i) => {
      return tinycolor(color)
        .darken(i * 5)
        .toHexString()
    })
    .filter((item) => item !== '#000000')
  return [
    ...lightens,
    ...darkens,
    ...alphaColors,
    ...shortAlphaColors,
    ...tinycolorDarkens,
    ...tinycolorLightens,
  ].filter((item) => !item.includes('-'))
}
