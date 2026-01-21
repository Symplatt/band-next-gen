// 基础亲属类型定义
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

// mothersFamily 接口，包含所有亲属关系，均为可选
interface Family {
  mothers?: Mother[]
  sisters?: Sister[]
  kids?: Kid[]
}

export interface IntroSegment {
  introTitle: string;
  content: string[]; // 正文内容也是数组形式 ["段落1", "段落2"]
}

interface Profile {
  height: string
  mbti?: string       // 部分角色可能没有，保留 ?
  birthday: string
  constellation: string
  longIntro: IntroSegment[] // 修正：统一为对象数组结构
}

interface Member {
  id: string
  route: string
  name: string
  romaji: string
  codeName?: string // Ex-Lilith和Ave Mujica才有
  position: string
  school: string
  image: string[]        // mothers字符串数组
  studentCard?: string[] // mothers字符串数组，且部分人可能没有
  specialNote?: string
  profile: Profile
  family?: Family        // mothers家庭关系集合，部分人可能没有(如Other组)
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