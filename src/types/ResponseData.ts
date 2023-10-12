
type ResponseData = {
  barcode: string[],
  catno: string,
  community: {want: number, have: number},
  country: string,
  cover_image: string,
  format: string[]
  genre: string[]
  id: number,
  label: string[],
  master_id: number,
  master_url: string,
  resource_url: string,
  style: string[],
  thumb: string,
  title: string,
  type: string,
  uri: string,
  year: string
}

export {type ResponseData}
