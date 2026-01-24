// 介绍区
interface Archive {
    introTitle: string
    content: string[]
  }

  interface Profile {
    height: string
    birthday: string
    constellation: string
    mbti?: string
    longIntro: Archive[]
  }
  interface SimpleRel {
    name: string
    id: string
  }
  interface Family {
    mothers?: SimpleRel[]
    sisters?: SimpleRel[]
    kids?: SimpleRel[]
  }
  interface Member {
    id: string
    route: string
    name: string
    romaji: string
    codeName?: string
    position: string
    school: string
    image: string[]
    studentCard?: string[]
    specialNote?: string
    profile: Profile
    family?: Family
  }
  interface Group {
    groupKey: string
    bandLogo?: string
    members: Member[]
  }