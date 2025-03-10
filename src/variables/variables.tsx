export const PRODUCT_CATEGORIES = [
	'Face Care',
	'Body Care',
	'Hair Care',
	'Makeup',
	'Fragrance'
] as const

export const PRODUCT_BRANDS = [
	"L'Oréal",
	'MAC',
	'Maybelline',
	'NYX',
	'Estée Lauder',
	'Clinique',
	'NARS'
] as const

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]
export type ProductBrand = (typeof PRODUCT_BRANDS)[number]
