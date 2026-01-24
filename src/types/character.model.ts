// 档案区
export interface IntroSegment {
  introTitle: string
  content: string[]
}

// 介绍区
export interface Profile {
  height: string
  birthday: string
  constellation: string
  mbti?: string
  longIntro: IntroSegment[]
}

// 家庭关系中的角色小卡片
export interface SimpleRel {
  name: string
  id: string
}

// 家庭关系
export interface Family {
  mothers?: SimpleRel[]
  sisters?: SimpleRel[]
  kids?: SimpleRel[]
  spouse?: SimpleRel
}

// 成员信息
export interface Member {
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

// 团队（乐队）
export interface Group {
  groupKey: string
  bandLogo?: string
  members: Member[]
}