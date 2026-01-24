// src/utils/assets.ts

// 把 baseUrl 的获取逻辑放进来
const baseUrl = import.meta.env.BASE_URL

export const resolvePath = (path: string) => {
  if (!path) return ''
  // 如果已经是网络图片，直接返回
  if (path.startsWith('http') || path.startsWith('https')) return path
  // 去掉开头的 / 防止双斜杠
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  
  return `${baseUrl}${cleanPath}`
}