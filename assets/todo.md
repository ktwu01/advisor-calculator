** 待办事项 **
[x] 需要添加国际化i18n。
check below follow same pattern as lagacy page
interface AdvisorData {
  nickname: string;
  advisorType: string; (选项，可以加分减分。不是填写。)
  degree: string; (选项，可以加分减分。不是填写。)
  field: string; (是填写string。)
  advisorTitle: string;
  schoolLevel: string;
  gender: string; // 新增性别
  ageRange: string; // 新增年龄段
  degreeType: string; // 新增学位类型
  weights: { school: number; advisor: number };
  scores: {
    personality: number;
    research: number;
    groupSize: number;
    genderRatio: number;
    workLife: number;
    funding: number;
    graduation: number;
    guidance: number;
    labCondition: number;
    location: number;
    future: number;
    seniorRelation: number;
    peerRelation: number;
    reputation: number;
    internship: number;
    researchFunding: number;
    salary: number;
    livingCost: number;
    managementStyle: number; // 新增管理风格
    communication: number; // 新增沟通能力
  };
}
[] 需要改进英文readme。
[] 目前有一个问题就是，劣势造成的影响往往比优势带来的优点更大，假定为2倍。你结合进行算法的改进。

1. did not show "import" and "export data" bottom\
2. no "basic info" compared with lagacy page\
3. eval metrics of 2 advisors are linked, which means change of ad1 will apply to ad2, this is fatal mistake.\
4. "lab size" should follow the same algo of gender: too many or too less are both bad.\
5. smart weight system should based on "degree" choice of "basic info", as in legacy page.\
6. should provide "details (collapsible)" in the buttom of the page like what "readme.cn.md" in the root folder.\\

[x] 关闭网页之前需要提示，先导出再关闭。