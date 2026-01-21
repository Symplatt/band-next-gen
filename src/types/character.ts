interface Mother {
  name: string
  id: string
}

interface Sister {
  name: string
  id: string

}

interface Kid {
  name: string
  id: string

}

interface Profile {
  height: string
  mbti?: string
  birthday: string
  constellation?: string
  shortIntro: string
  longIntro: string
  mothers: Mother[]
}

interface Member {
  id: string
  route: string
  name: string
  romaji: string
  codeName?: string
  position: string
  school: string
  image: string
  studentCard?: string
  specialNote?: string
  profile: Profile
}

interface Group {
  groupKey: string
  groupName: string
  bandLogo?: string
  description: string
  members: Member[]
}

export default interface CharachtersInterface {
  groups: Group[]
}