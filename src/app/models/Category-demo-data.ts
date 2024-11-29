import { ICategoryModel } from './ICategoryModel';

export const demoCategories: ICategoryModel[] = [
  {
    Id: '1',
    Name: 'Arbeit',
    Description: 'Alles über das Arbeitsumfeld.',
    CreatedDate: new Date(2024, 0, 15)
  },
  {
    Id: '2',
    Name: 'Beziehung',
    Description: 'Liebe, Partner und Freundschaften',
    CreatedDate: new Date(2024, 1, 20)
  },
  {
    Id: '3',
    Name: 'Individuum',
    Description: 'Persönlichkeiten, Hobbys und Spass.',
    CreatedDate: new Date(2024, 2, 10)
  }
];
