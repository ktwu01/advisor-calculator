"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Info, Download, Upload, Plus, Minus, Github, GitFork, ChevronDown, ChevronUp } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface AdvisorData {
  nickname: string;
  advisorType: string;
  degree: string;
  field: string;
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

const defaultAdvisorData: AdvisorData = {
  nickname: "",
  advisorType: "",
  degree: "",
  field: "",
  advisorTitle: "",
  schoolLevel: "",
  gender: "",
  ageRange: "",
  degreeType: "",
  weights: { school: 50, advisor: 50 },
  scores: {
    personality: 3,
    research: 3,
    groupSize: 3,
    genderRatio: 3,
    workLife: 3,
    funding: 3,
    graduation: 3,
    guidance: 3,
    labCondition: 3,
    location: 3,
    future: 3,
    seniorRelation: 3,
    peerRelation: 3,
    reputation: 3,
    internship: 3,
    researchFunding: 3,
    salary: 3,
    livingCost: 3,
    managementStyle: 3,
    communication: 3,
  },
};

export default function AdvisorComparison() {
  const [advisors, setAdvisors] = useState<AdvisorData[]>([
    { ...defaultAdvisorData },
    { ...defaultAdvisorData },
  ]);
  const [visitCount, setVisitCount] = useState(0);
  const [expandedDetails, setExpandedDetails] = useState<number[]>([]);

  useEffect(() => {
    const count = localStorage.getItem('advisorCalcVisitCount');
    const currentCount = count ? parseInt(count) + 1 : 1;
    setVisitCount(currentCount);
    localStorage.setItem('advisorCalcVisitCount', currentCount.toString());
  }, []);

  const getTitleMultiplier = (advisor: AdvisorData) => {
    switch(advisor.advisorTitle) {
      case "nobel": return 1.3;
      case "academician": return 1.25;
      case "changjiang": return 1.2;
      case "thousand": return 1.15;
      case "distinguished": return 1.1;
      case "excellent": return 1.05;
      case "normal": return 1.0;
      default: return 1.0;
    }
  };

  const getSchoolMultiplier = (advisor: AdvisorData) => {
    switch(advisor.schoolLevel) {
      case "global_top": return 1.3;
      case "national_top": return 1.25;
      case "c9": return 1.2;
      case "985": return 1.15;
      case "211": return 1.1;
      case "regular": return 1.0;
      case "vocational": return 0.9;
      default: return 1.0;
    }
  };

  const getGenderAgeMultiplier = (advisor: AdvisorData) => {
    let multiplier = 1.0;
    if (advisor.gender === "female") {
      multiplier *= 1.1;
    }
    if (advisor.ageRange === "young") {
      multiplier *= 0.9;
    } else if (advisor.ageRange === "senior") {
      multiplier *= 1.1;
    }
    return multiplier;
  };

  const calculateDetailedScores = (advisor: AdvisorData) => {
    const titleMultiplier = getTitleMultiplier(advisor);
    const schoolMultiplier = getSchoolMultiplier(advisor);
    const genderAgeMultiplier = getGenderAgeMultiplier(advisor);

    const getGenderRatioScore = (value: number) => {
      switch(value) {
        case 1: return 0.1;
        case 2: return 0.5;
        case 3: return 1.0;
        case 4: return 0.5;
        case 5: return 0.2;
        default: return 0.5;
      }
    };

    // 人品分 (导师个人品质相关)
    const personalityScore = (
      advisor.scores.personality * 0.4 +
      advisor.scores.communication * 0.3 +
      advisor.scores.managementStyle * 0.3
    ) * genderAgeMultiplier;

    // 学术分 (学术研究相关)
    const academicScore = (
      advisor.scores.research * 0.4 * titleMultiplier +
      advisor.scores.reputation * 0.3 +
      advisor.scores.future * 0.3 * titleMultiplier
    ) * schoolMultiplier;

    // 待遇分 (工作生活条件相关)
    const treatmentScore = (
      advisor.scores.workLife * 0.3 +
      advisor.scores.salary * 0.25 +
      advisor.scores.funding * 0.2 * titleMultiplier +
      advisor.scores.labCondition * 0.15 +
      advisor.scores.livingCost * 0.1
    );

    // 前景分 (发展前景相关)
    const prospectScore = (
      advisor.scores.graduation * 0.3 +
      advisor.scores.guidance * 0.25 +
      advisor.scores.internship * 0.2 +
      advisor.scores.researchFunding * 0.15 +
      advisor.scores.location * 0.1
    );

    return {
      personality: Math.round(personalityScore * 20 * 10) / 10,
      academic: Math.round(academicScore * 20 * 10) / 10,
      treatment: Math.round(treatmentScore * 20 * 10) / 10,
      prospect: Math.round(prospectScore * 20 * 10) / 10
    };
  };

  const calculateScore = (advisor: AdvisorData) => {
    const titleMultiplier = getTitleMultiplier(advisor);
    const schoolMultiplier = getSchoolMultiplier(advisor);
    const genderAgeMultiplier = getGenderAgeMultiplier(advisor);
    const schoolWeight = advisor.weights.school / 100;
    const advisorWeight = advisor.weights.advisor / 100;

    const getGenderRatioScore = (value: number) => {
      switch(value) {
        case 1: return 0.1;
        case 2: return 0.5;
        case 3: return 1.0;
        case 4: return 0.5;
        case 5: return 0.2;
        default: return 0.5;
      }
    };

    const advisorScores = {
      personality: advisor.scores.personality * 0.1,
      research: advisor.scores.research * 0.12 * titleMultiplier,
      groupSize: advisor.scores.groupSize * 0.04,
      genderRatio: getGenderRatioScore(advisor.scores.genderRatio) * 0.02,
      workLife: advisor.scores.workLife * 0.1,
      funding: advisor.scores.funding * 0.08 * titleMultiplier,
      graduation: advisor.scores.graduation * 0.06,
      guidance: advisor.scores.guidance * 0.05,
      labCondition: advisor.scores.labCondition * 0.03,
      location: advisor.scores.location * 0.03,
      future: advisor.scores.future * 0.08 * titleMultiplier,
      seniorRelation: advisor.scores.seniorRelation * 0.06,
      peerRelation: advisor.scores.peerRelation * 0.04,
      reputation: advisor.scores.reputation * 0.08,
      internship: advisor.scores.internship * 0.03,
      researchFunding: advisor.scores.researchFunding * 0.05,
      salary: advisor.scores.salary * 0.05,
      livingCost: advisor.scores.livingCost * 0.03,
      managementStyle: advisor.scores.managementStyle * 0.06 * genderAgeMultiplier,
      communication: advisor.scores.communication * 0.04 * genderAgeMultiplier,
    };

    const schoolScore = schoolMultiplier * 3;

    let advisorTotalScore = 0;
    for (const score of Object.values(advisorScores)) {
      advisorTotalScore += score;
    }

    const finalScore = (schoolScore * schoolWeight + advisorTotalScore * advisorWeight) * 20;
    return Math.round(finalScore * 10) / 10;
  };

  const getScoreLevel = (score: number) => {
    if (score >= 85) return { level: "神仙导师", color: "text-green-600 bg-green-100" };
    if (score >= 75) return { level: "优秀导师", color: "text-blue-600 bg-blue-100" };
    if (score >= 65) return { level: "还行吧", color: "text-yellow-600 bg-yellow-100" };
    if (score >= 50) return { level: "有点坑", color: "text-orange-600 bg-orange-100" };
    return { level: "大坑避雷", color: "text-red-600 bg-red-100" };
  };

  const addAdvisor = () => {
    if (advisors.length < 3) {
      setAdvisors([...advisors, { ...defaultAdvisorData }]);
    }
  };

  const removeAdvisor = (index: number) => {
    if (advisors.length > 2) {
      setAdvisors(advisors.filter((_, i) => i !== index));
    }
  };

  const updateAdvisor = (index: number, field: string, value: unknown) => {
    const newAdvisors = [...advisors];
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (newAdvisors[index] as any)[parent][child] = value;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (newAdvisors[index] as any)[field] = value;
    }
    
    // 根据学位类型自动调整权重
    if (field === 'degreeType') {
      let schoolWeight = 50;
      let advisorWeight = 50;
      
      switch (value) {
        case 'masters':
          schoolWeight = 60;
          advisorWeight = 40;
          break;
        case 'phd':
          schoolWeight = 30;
          advisorWeight = 70;
          break;
        case 'postdoc':
          schoolWeight = 20;
          advisorWeight = 80;
          break;
      }
      
      newAdvisors[index].weights = { school: schoolWeight, advisor: advisorWeight };
    }
    
    setAdvisors(newAdvisors);
  };

  const exportComparison = () => {
    const data = {
      advisors,
      exportDate: new Date().toISOString(),
      version: "2.1.0"
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `导师对比_${new Date().toLocaleDateString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importComparison = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string);
            if (data.advisors && Array.isArray(data.advisors)) {
              setAdvisors(data.advisors);
              alert('数据导入成功！');
            } else {
              alert('文件格式不正确，请检查文件。');
            }
          } catch (error) {
            alert('文件解析失败，请检查文件格式。');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const toggleDetailsExpanded = (index: number) => {
    setExpandedDetails(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const getDetailedAnalysis = (advisor: AdvisorData) => {
    const detailedScores = calculateDetailedScores(advisor);
    const totalScore = calculateScore(advisor);
    
    const advantages = [];
    const risks = [];
    
    if (detailedScores.personality >= 70) advantages.push("导师人品较好，沟通顺畅");
    if (detailedScores.academic >= 70) advantages.push("学术实力强，发展前景好");
    if (detailedScores.treatment >= 70) advantages.push("工作环境和待遇不错");
    if (detailedScores.prospect >= 70) advantages.push("毕业和就业前景良好");
    
    if (detailedScores.personality < 50) risks.push("人际关系可能存在问题");
    if (detailedScores.academic < 50) risks.push("学术资源可能不足");
    if (detailedScores.treatment < 50) risks.push("工作条件可能较差");
    if (detailedScores.prospect < 50) risks.push("发展前景可能有限");
    
    let suggestion = "";
    if (totalScore >= 80) suggestion = "强烈推荐，这是一个很好的选择！";
    else if (totalScore >= 70) suggestion = "总体不错，可以考虑选择。";
    else if (totalScore >= 60) suggestion = "有一定风险，建议多方面了解情况。";
    else suggestion = "存在较大风险，建议谨慎考虑。";
    
    return {
      advantages: advantages.length > 0 ? advantages : ["需要更多信息来评估优势"],
      risks: risks.length > 0 ? risks : ["暂无明显风险"],
      suggestion
    };
  };

  const scoreLabels = {
    personality: "导师人品",
    research: "科研实力",
    groupSize: "课题组规模",
    genderRatio: "课题组性别比例",
    workLife: "工作生活平衡",
    funding: "课题组资金",
    graduation: "毕业难易度",
    guidance: "指导频率",
    labCondition: "实验室条件",
    location: "地理位置",
    future: "发展前景",
    seniorRelation: "师生关系",
    peerRelation: "同学关系",
    reputation: "圈内声誉",
    internship: "实习政策",
    researchFunding: "研究经费",
    salary: "工资待遇",
    livingCost: "生活费",
    managementStyle: "管理风格",
    communication: "沟通能力",
  };

  const scoreOptions = {
    personality: ['人品有问题', '一般', '中等', '不错', '人品很好'],
    research: ['学术水平低', '一般', '中等', '不错', '学术大牛'],
    groupSize: ['过少(<5人)', '较少(5-10人)', '适中(10-15人)', '较多(15-20人)', '过多(>20人)'],
    genderRatio: ['全男生', '男生为主', '性别均衡', '女生为主', '全女生'],
    workLife: ['白加黑(007)', '严重加班(996)', '偶尔加班', '正常上下班', '很轻松'],
    funding: ['经常缺钱', '资金紧张', '一般', '资金充足', '资金非常充足'],
    graduation: ['非常困难', '比较困难', '一般', '比较容易', '很容易'],
    guidance: ['几乎不管', '很少指导', '一般', '经常指导', '非常频繁'],
    labCondition: ['条件很差', '条件一般', '中等水平', '条件不错', '条件优越'],
    location: ['偏僻地区', '偏远地区', '一般地区', '市中心', 'CBD核心区'],
    future: ['前景暗淡', '前景一般', '中等前景', '前景不错', '前景光明'],
    seniorRelation: ['关系紧张', '关系一般', '中等关系', '关系良好', '关系非常好'],
    peerRelation: ['同事都是傻逼', '萍水相逢', '一般关系', '和和睦睦', '私交甚好'],
    reputation: ['声誉很差', '声誉一般', '中等声誉', '声誉不错', '声誉很好'],
    internship: ['禁止实习', '不鼓励实习', '一般', '鼓励实习', '强烈支持'],
    researchFunding: ['经费紧张', '经费一般', '中等水平', '经费充足', '经费非常充足'],
    salary: ['待遇很低', '待遇一般', '中等待遇', '待遇不错', '待遇优越'],
    livingCost: ['生活成本高', '成本较高', '中等水平', '成本较低', '成本很低'],
    managementStyle: ['对我不爽', '管理严格', '中规中矩', '善解人意', '我是嫡系'],
    communication: ['沟通困难', '沟通一般', '中等水平', '沟通不错', '沟通能力强']
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-2">
              这个导师坑不坑·测算版
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              科学对比多个导师，帮你避坑黑导师
            </p>
            <div className="flex justify-center items-center gap-6">
              <Badge variant="outline" className="text-lg px-4 py-2">v2.1.0</Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {/* 访问量: {visitCount.toLocaleString()} */}
              </Badge>
              <Button
                variant="outline"
                className="flex items-center gap-2 text-lg px-6 py-2"
                onClick={() => window.open('https://github.com/ktwu01/advisor-calculator', '_blank')}
              >
                <Github className="h-5 w-5" />
                GitHub
              </Button>
              <Button
                variant="default"
                className="flex items-center gap-2 text-lg px-6 py-2 bg-green-600 hover:bg-green-700"
                onClick={() => window.open('https://github.com/ktwu01/advisor-calculator/fork', '_blank')}
              >
                <GitFork className="h-5 w-5" />
                一键Fork
              </Button>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mb-8">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={importComparison} variant="outline" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  导入数据
                  <Info className="h-3 w-3 ml-1" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>导入数据 可以导出当前评价数据或导入之前保存的数据。</p>
              </TooltipContent>
            </Tooltip>
            <Button onClick={exportComparison} variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              导出对比
            </Button>
            <Button onClick={addAdvisor} disabled={advisors.length >= 3} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              添加导师
            </Button>
          </div>

          {/* Comparison Grid */}
          <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${advisors.length}, 1fr)` }}>
            {advisors.map((advisor, index) => (
              <Card key={index} className="relative">
                {advisors.length > 2 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 h-8 w-8 p-0"
                    onClick={() => removeAdvisor(index)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                )}

                <CardHeader className="text-center pb-4">
                  <div className="space-y-4">
                    <div className="relative">
                      <Input
                        placeholder={`导师 ${index + 1} 昵称（如：张老登。使用自己看得懂的化名，以便导出和导入。我们不会储存信息）`}
                        value={advisor.nickname}
                        onChange={(e) => updateAdvisor(index, 'nickname', e.target.value)}
                        className="text-center text-lg font-semibold"
                      />
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 absolute right-2 top-2 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>建议使用自己看得懂的花名，以便导出和导入。不要使用真实姓名，虽然我们不会储存信息</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>

                    <div className={`text-3xl font-bold px-4 py-2 rounded-lg ${getScoreLevel(calculateScore(advisor)).color}`}>
                      {calculateScore(advisor).toFixed(1)}分
                    </div>

                    <div className="text-sm text-gray-600">
                      {getScoreLevel(calculateScore(advisor)).level}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* 详细评估结果 */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">坑度评估结果</h3>
                    <div className="space-y-3">
                      <div className="text-center space-y-2">
                        <div className="text-sm text-gray-600">
                          当前权重配置：学校 {advisor.weights.school}% | 导师 {advisor.weights.advisor}%
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-center">
                          {(() => {
                            const detailedScores = calculateDetailedScores(advisor);
                            return (
                              <>
                                <div className="bg-blue-50 p-3 rounded-lg">
                                  <div className="text-2xl font-bold text-blue-600">{detailedScores.personality}</div>
                                  <div className="text-xs text-gray-600">人品分</div>
                                </div>
                                <div className="bg-green-50 p-3 rounded-lg">
                                  <div className="text-2xl font-bold text-green-600">{detailedScores.academic}</div>
                                  <div className="text-xs text-gray-600">学术分</div>
                                </div>
                                <div className="bg-purple-50 p-3 rounded-lg">
                                  <div className="text-2xl font-bold text-purple-600">{detailedScores.treatment}</div>
                                  <div className="text-xs text-gray-600">待遇分</div>
                                </div>
                                <div className="bg-orange-50 p-3 rounded-lg">
                                  <div className="text-2xl font-bold text-orange-600">{detailedScores.prospect}</div>
                                  <div className="text-xs text-gray-600">前景分</div>
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      </div>
                      
                      <Collapsible open={expandedDetails.includes(index)} onOpenChange={() => toggleDetailsExpanded(index)}>
                        <CollapsibleTrigger asChild>
                          <Button 
                            variant="outline" 
                            className="w-full flex items-center justify-between"
                          >
                            <span>{expandedDetails.includes(index) ? '隐藏' : '查看'}详细分析</span>
                            {expandedDetails.includes(index) ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-4 mt-4">
                          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                            <h4 className="font-semibold">详细分析报告</h4>
                            <div className="space-y-2">
                              <p className="text-sm text-gray-700">
                                <strong>综合评价：</strong>{advisor.nickname || '未设置昵称'}
                              </p>
                              <p className="text-sm text-gray-700">
                                基于您的评分，该导师在各项指标上的表现如上所示。
                              </p>
                            </div>
                            
                            {(() => {
                              const analysis = getDetailedAnalysis(advisor);
                              return (
                                <div className="space-y-2">
                                  <div>
                                    <strong className="text-green-600">主要优势：</strong>
                                    <ul className="text-sm text-gray-700 mt-1 ml-4">
                                      {analysis.advantages.map((adv, i) => (
                                        <li key={i} className="list-disc">{adv}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <strong className="text-red-600">潜在风险：</strong>
                                    <ul className="text-sm text-gray-700 mt-1 ml-4">
                                      {analysis.risks.map((risk, i) => (
                                        <li key={i} className="list-disc">{risk}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <strong className="text-blue-600">建议：</strong>
                                    <p className="text-sm text-gray-700 mt-1">{analysis.suggestion}</p>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  </div>

                  {/* 基本信息 */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">基本信息</h3>

                    <div className="space-y-3">
                      <Select value={advisor.gender} onValueChange={(value) => updateAdvisor(index, 'gender', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="导师性别（仅供自己参考，不参与系统打分）" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">男性</SelectItem>
                          <SelectItem value="female">女性</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={advisor.ageRange} onValueChange={(value) => updateAdvisor(index, 'ageRange', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="年龄段" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="young">青年导师 (30-40岁)</SelectItem>
                          <SelectItem value="middle">中年导师 (40-55岁)</SelectItem>
                          <SelectItem value="senior">资深导师 (55岁以上)</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={advisor.degreeType} onValueChange={(value) => updateAdvisor(index, 'degreeType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="攻读学位" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="masters">硕士</SelectItem>
                          <SelectItem value="phd">博士</SelectItem>
                          <SelectItem value="postdoc">博士后</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={advisor.advisorTitle} onValueChange={(value) => updateAdvisor(index, 'advisorTitle', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="导师头衔" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nobel">诺奖/菲尔兹奖</SelectItem>
                          <SelectItem value="academician">院士</SelectItem>
                          <SelectItem value="changjiang">长江学者</SelectItem>
                          <SelectItem value="thousand">千人/万人/百人</SelectItem>
                          <SelectItem value="distinguished">杰青</SelectItem>
                          <SelectItem value="excellent">优青</SelectItem>
                          <SelectItem value="normal">普通青椒</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={advisor.schoolLevel} onValueChange={(value) => updateAdvisor(index, 'schoolLevel', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="学校等级" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="global_top">全球顶尖</SelectItem>
                          <SelectItem value="national_top">全国顶尖</SelectItem>
                          <SelectItem value="c9">C9联盟</SelectItem>
                          <SelectItem value="985">985工程</SelectItem>
                          <SelectItem value="211">211工程</SelectItem>
                          <SelectItem value="regular">二本院校</SelectItem>
                          <SelectItem value="vocational">职业院校</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* 评价指标 */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">评价指标</h3>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {Object.entries(advisor.scores).map(([key, value]) => {
                        const options = scoreOptions[key as keyof typeof scoreOptions] || [];
                        return (
                          <div key={key} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <Label className="text-sm">
                                {scoreLabels[key as keyof typeof scoreLabels]}
                              </Label>
                              <Badge variant="outline" className="text-xs">
                                {options[value - 1] || `${value}/5`}
                              </Badge>
                            </div>
                            <Slider
                              value={[value]}
                              onValueChange={(newValue) => updateAdvisor(index, `scores.${key}`, newValue[0])}
                              min={1}
                              max={5}
                              step={1}
                              className="w-full"
                            />
                            <div className="flex justify-between text-xs text-gray-500 px-1">
                              <span>{options[0]}</span>
                              <span>{options[4]}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 权重设置 */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg border-b pb-2">⚖️ 智能权重系统</h3>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="space-y-2">
                            <p>权重定义：学校品牌 vs 导师个人因素的重要性比例</p>
                            <p>硕士推荐：学校60% 导师40%</p>
                            <p>博士推荐：学校30% 导师70%</p>
                            <p>博士后推荐：学校20% 导师80%</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label className="text-sm">学校权重: {advisor.weights.school}%</Label>
                        <Slider
                          value={[advisor.weights.school]}
                          onValueChange={(value) => updateAdvisor(index, 'weights', {school: value[0], advisor: 100 - value[0]})}
                          min={0}
                          max={100}
                          step={5}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">导师权重: {advisor.weights.advisor}%</Label>
                        <Slider
                          value={[advisor.weights.advisor]}
                          onValueChange={(value) => updateAdvisor(index, 'weights', {school: 100 - value[0], advisor: value[0]})}
                          min={0}
                          max={100}
                          step={5}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 对比结果总结 */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-center text-2xl">对比结果总结</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${advisors.length}, 1fr)` }}>
                {advisors.map((advisor, index) => {
                  const score = calculateScore(advisor);
                  const level = getScoreLevel(score);
                  return (
                    <div key={index} className="text-center space-y-2">
                      <h3 className="font-semibold text-lg">
                        {advisor.nickname || `导师 ${index + 1}`}
                      </h3>
                      <div className={`text-2xl font-bold px-4 py-2 rounded-lg ${level.color}`}>
                        {score.toFixed(1)}分
                      </div>
                      <div className="text-sm text-gray-600">{level.level}</div>
                      <div className="text-xs text-gray-500">
                        学校{advisor.weights.school}% | 导师{advisor.weights.advisor}%
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 text-center">
                <div className="text-lg font-semibold mb-2">最佳选择</div>
                {(() => {
                  const scores = advisors.map((advisor, index) => ({
                    score: calculateScore(advisor),
                    name: advisor.nickname || `导师 ${index + 1}`,
                    index
                  }));
                  const maxScore = Math.max(...scores.map(s => s.score));
                  const bestScores = scores.filter(s => s.score === maxScore);
                  
                  if (bestScores.length > 1) {
                    return (
                      <div className="text-2xl font-bold text-yellow-600">
                        ⚖️ 两个导师旗鼓相当，三思而后行哦
                      </div>
                    );
                  }
                  
                  const best = bestScores[0];
                  return (
                    <div className="text-2xl font-bold text-green-600">
                      🏆 {best.name} ({best.score.toFixed(1)}分)
                    </div>
                  );
                })()}
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-sm text-gray-500 mt-8 space-y-2">
            <p>本工具仅供参考，请结合实际情况理性选择导师</p>
            <p>数据仅保存在本地，不会上传到服务器</p>
            <p>
              <a
                href="https://github.com/ktwu01/advisor-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                GitHub开源项目
              </a>
              {" | "}
              <button
                onClick={() => window.open('https://github.com/ktwu01/advisor-calculator/fork', '_blank')}
                className="text-blue-600 hover:underline"
              >
                Fork这个项目
              </button>
            </p>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
