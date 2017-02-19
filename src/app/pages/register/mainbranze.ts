export class MainBranze {
  id: number;
  name: string;
  parentCategory: number;
}

export class PodKategoria {
  id: number;
  name: string;
  parentCategory: MainBranze;
}
