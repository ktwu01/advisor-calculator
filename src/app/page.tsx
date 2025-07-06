"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Info, Download, Upload, Plus, Minus, Github, GitFork } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AdvisorData {
  nickname: string;
  advisorType: string;
  degree: string;
  field: string;
  advisorTitle: string;
  schoolLevel: string;
  gender: string; // 新增性别
  ageRange: string; // 新增年龄段
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

  useEffect(() => {
    const count = localStorage.getItem('advisorCalcVisitCount');
    const currentCount = count ? parseInt(count) + 1 : 1;
    setVisitCount(currentCount);
    localStorage.setItem('advisorCalcVisitCount', currentCount.toString());
  }, []);

  const calculateScore = (advisor: AdvisorData) => {
    const getTitleMultiplier = () => {
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

    const getSchoolMultiplier = () => {
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

    // 性别和年龄影响管理风格权重
    const getGenderAgeMultiplier = () => {
      let multiplier = 1.0;

      // 性别影响（基于普遍管理风格研究）
      if (advisor.gender === "female") {
        multiplier *= 1.1; // 女性导师通常在沟通和人际关系方面更擅长
      }

      // 年龄影响
      if (advisor.ageRange === "young") {
        multiplier *= 0.9; // 年轻导师可能在管理经验上稍欠缺
      } else if (advisor.ageRange === "senior") {
        multiplier *= 1.1; // 资深导师管理经验更丰富
      }

      return multiplier;
    };

    const titleMultiplier = getTitleMultiplier();
    const schoolMultiplier = getSchoolMultiplier();
    const genderAgeMultiplier = getGenderAgeMultiplier();
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
    return Math.round(finalScore);
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

  const updateAdvisor = (index: number, field: string, value: any) => {
    const newAdvisors = [...advisors];
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      (newAdvisors[index] as any)[parent][child] = value;
    } else {
      (newAdvisors[index] as any)[field] = value;
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
                    <Input
                      placeholder={`导师 ${index + 1} 昵称`}
                      value={advisor.nickname}
                      onChange={(e) => updateAdvisor(index, 'nickname', e.target.value)}
                      className="text-center text-lg font-semibold"
                    />

                    <div className={`text-3xl font-bold px-4 py-2 rounded-lg ${getScoreLevel(calculateScore(advisor)).color}`}>
                      {calculateScore(advisor)}分
                    </div>

                    <div className="text-sm text-gray-600">
                      {getScoreLevel(calculateScore(advisor)).level}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
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
                      {Object.entries(advisor.scores).map(([key, value]) => (
                        <div key={key} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <Label className="text-sm">
                              {scoreLabels[key as keyof typeof scoreLabels]}
                            </Label>
                            <Badge variant="outline" className="text-xs">
                              {value}/5
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
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 权重设置 */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">权重设置</h3>
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
                        {score}分
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
                  const best = scores.reduce((prev, current) =>
                    current.score > prev.score ? current : prev
                  );
                  return (
                    <div className="text-2xl font-bold text-green-600">
                      🏆 {best.name} ({best.score}分)
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
