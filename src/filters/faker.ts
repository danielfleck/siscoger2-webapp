import Faker from 'faker'

declare type Lorem = 'lines' | 'paragraph' | 'paragraphs' | 'sentence' | 'sentences' | 'slug' | 'text' | 'word' | 'words'
export const fakeLorem = (type: Lorem, number: number):string => {
  let val = ''
  if (type === 'lines') val = Faker.lorem.lines(number)
  if (type === 'paragraph') val = Faker.lorem.paragraph(number)
  if (type === 'paragraphs') val = Faker.lorem.paragraphs(number)
  if (type === 'sentence') val = Faker.lorem.sentence(number)
  if (type === 'sentences') val = Faker.lorem.sentences(number)
  if (type === 'slug') val = Faker.lorem.slug(number)
  if (type === 'text') val = Faker.lorem.text(number)
  if (type === 'word') val = Faker.lorem.word(number)
  if (type === 'words') val = Faker.lorem.words(number)
  return String(val)
}
