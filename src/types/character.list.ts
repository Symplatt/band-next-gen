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

  interface Family {
    mothers?: Mother[]
    sisters?: Sister[]
    kids?: Kid[]
  }

  interface IntroSegment {
    introTitle: string
    content: string[]
  }

  interface Profile {
    height: string
    birthday: string
    constellation: string
    mbti?: string
    longIntro: IntroSegment[]
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

  export default interface Group {
    groupKey: string
    groupName: string
    bandLogo?: string
    description: string
    members: Member[]
  }