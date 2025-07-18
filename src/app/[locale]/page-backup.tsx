// src/app/[locale]/page.tsx - Fixed for Next.js 15
"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Info,
  Download,
  Upload,
  Plus,
  Minus,
  Github,
  GitFork,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { locales } from "@/i18n/config";

interface AdvisorData {
  nickname: string;
  advisorType: string;
  degree: string;
  field: string;
  advisorTitle: string;
  schoolLevel: string;
  gender: string;
  ageRange: string;
  degreeType: string;
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
    managementStyle: number;
    communication: number;
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
  const t = useTranslations();
  const locale = useLocale(); // Get current locale
  const [advisors, setAdvisors] = useState<AdvisorData[]>([
    { ...defaultAdvisorData },
    { ...defaultAdvisorData },
  ]);

  // Get translated options
  const getScoreOptions = (key: string): string[] => {
    return t.raw(`scoreOptions.${key}`) as string[];
  };

  const getScoreLabel = (key: string): string => {
    return t(`scoreLabels.${key}`);
  };

  // All your existing calculation functions remain the same...
  const getTitleMultiplier = (advisor: AdvisorData) => {
    switch (advisor.advisorTitle) {
      case "nobel":
        return 1.3;
      case "academician":
        return 1.25;
      case "changjiang":
        return 1.2;
      case "thousand":
        return 1.15;
      case "distinguished":
        return 1.1;
      case "excellent":
        return 1.05;
      case "normal":
        return 1.0;
      default:
        return 1.0;
    }
  };

  const getSchoolMultiplier = (advisor: AdvisorData) => {
    switch (advisor.schoolLevel) {
      case "global_top":
        return 1.3;
      case "national_top":
        return 1.25;
      case "c9":
        return 1.2;
      case "985":
        return 1.15;
      case "211":
        return 1.1;
      case "regular":
        return 1.0;
      case "vocational":
        return 0.9;
      default:
        return 1.0;
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
      switch (value) {
        case 1:
          return 0.1;
        case 2:
          return 0.5;
        case 3:
          return 1.0;
        case 4:
          return 0.5;
        case 5:
          return 0.2;
        default:
          return 0.5;
      }
    };

    const personalityScore =
      (advisor.scores.personality * 0.35 +
        advisor.scores.communication * 0.25 +
        advisor.scores.managementStyle * 0.25 +
        advisor.scores.seniorRelation * 0.15) *
      genderAgeMultiplier;

    const academicScore =
      (advisor.scores.research * 0.35 * titleMultiplier +
        advisor.scores.reputation * 0.25 +
        advisor.scores.future * 0.25 * titleMultiplier +
        advisor.scores.researchFunding * 0.15) *
      schoolMultiplier;

    const treatmentScore =
      advisor.scores.workLife * 0.3 +
      advisor.scores.salary * 0.2 +
      advisor.scores.funding * 0.2 * titleMultiplier +
      advisor.scores.labCondition * 0.15 +
      advisor.scores.livingCost * 0.1 +
      advisor.scores.location * 0.05;

    const prospectScore =
      advisor.scores.graduation * 0.25 +
      advisor.scores.guidance * 0.2 +
      advisor.scores.internship * 0.15 +
      getGenderRatioScore(advisor.scores.groupSize) * 0.1 +
      advisor.scores.peerRelation * 0.1 +
      getGenderRatioScore(advisor.scores.genderRatio) * 5 * 0.2;

    return {
      personality: Math.round(personalityScore * 20 * 10) / 10,
      academic: Math.round(academicScore * 20 * 10) / 10,
      treatment: Math.round(treatmentScore * 20 * 10) / 10,
      prospect: Math.round(prospectScore * 20 * 10) / 10,
    };
  };

  const calculateScore = (advisor: AdvisorData) => {
    const titleMultiplier = getTitleMultiplier(advisor);
    const schoolMultiplier = getSchoolMultiplier(advisor);
    const genderAgeMultiplier = getGenderAgeMultiplier(advisor);
    const schoolWeight = advisor.weights.school / 100;
    const advisorWeight = advisor.weights.advisor / 100;

    const getGenderRatioScore = (value: number) => {
      switch (value) {
        case 1:
          return 0.1;
        case 2:
          return 0.5;
        case 3:
          return 1.0;
        case 4:
          return 0.5;
        case 5:
          return 0.2;
        default:
          return 0.5;
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
      managementStyle:
        advisor.scores.managementStyle * 0.06 * genderAgeMultiplier,
      communication: advisor.scores.communication * 0.04 * genderAgeMultiplier,
    };

    const schoolScore = schoolMultiplier * 3;

    let advisorTotalScore = 0;
    for (const score of Object.values(advisorScores)) {
      advisorTotalScore += score;
    }

    const finalScore =
      (schoolScore * schoolWeight + advisorTotalScore * advisorWeight) * 20;
    return Math.round(finalScore * 10) / 10;
  };

  const getScoreLevel = (score: number) => {
    if (score >= 85)
      return {
        level: t("levels.excellent"),
        color: "text-green-600 bg-green-100",
      };
    if (score >= 75)
      return { level: t("levels.good"), color: "text-blue-600 bg-blue-100" };
    if (score >= 65)
      return {
        level: t("levels.average"),
        color: "text-yellow-600 bg-yellow-100",
      };
    if (score >= 50)
      return {
        level: t("levels.poor"),
        color: "text-orange-600 bg-orange-100",
      };
    return { level: t("levels.terrible"), color: "text-red-600 bg-red-100" };
  };

  const updateAdvisor = (index: number, field: string, value: unknown) => {
    const newAdvisors = [...advisors];
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      if (parent === "scores" && typeof child === "string") {
        (newAdvisors[index].scores as Record<string, unknown>)[child] = value;
      } else if (parent === "weights" && typeof child === "string") {
        (newAdvisors[index].weights as Record<string, unknown>)[child] = value;
      }
    } else {
      (newAdvisors[index] as unknown as Record<string, unknown>)[field] = value;
    }

    if (field === "degreeType") {
      let schoolWeight = 50;
      let advisorWeight = 50;

      switch (value) {
        case "masters":
          schoolWeight = 60;
          advisorWeight = 40;
          break;
        case "phd":
          schoolWeight = 30;
          advisorWeight = 70;
          break;
        case "postdoc":
          schoolWeight = 20;
          advisorWeight = 80;
          break;
      }

      newAdvisors[index].weights = {
        school: schoolWeight,
        advisor: advisorWeight,
      };
    }

    setAdvisors(newAdvisors);
  };

  const exportComparison = () => {
    const data = {
      advisors,
      exportDate: new Date().toISOString(),
      version: "2.1.0",
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `advisor_calculator_${new Date().toLocaleDateString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importComparison = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string);
            if (data.advisors && Array.isArray(data.advisors)) {
              setAdvisors(data.advisors);
              alert(t("messages.importSuccess"));
            } else {
              alert(t("messages.importError"));
            }
          } catch (error) {
            alert(t("messages.parseError"));
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
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

  const getDetailedAnalysis = (advisor: AdvisorData) => {
    const detailedScores = calculateDetailedScores(advisor);
    const totalScore = calculateScore(advisor);

    const advantages = [];
    const risks = [];

    if (detailedScores.personality >= 70)
      advantages.push("导师人品较好，沟通顺畅");
    if (detailedScores.academic >= 70)
      advantages.push("学术实力强，发展前景好");
    if (detailedScores.treatment >= 70) advantages.push("工作环境和待遇不错");
    if (detailedScores.prospect >= 70) advantages.push("毕业和就业前景良好");

    Object.entries(advisor.scores).forEach(([key, value]) => {
      if (value >= 4) {
        const label = getScoreLabel(key);
        advantages.push(`${label}表现优秀`);
      }
    });

    const lowScoreItems: string[] = [];
    Object.entries(advisor.scores).forEach(([key, value]) => {
      if (value < 3) {
        const label = getScoreLabel(key);
        lowScoreItems.push(label);
      }
    });

    if (lowScoreItems.length > 0) {
      if (lowScoreItems.length <= 3) {
        risks.push(`${lowScoreItems.join("、")}方面存在不足`);
      } else {
        risks.push(
          `${lowScoreItems.slice(0, 3).join("、")}等${lowScoreItems.length}个方面存在不足`,
        );
      }
    }

    if (detailedScores.personality < 50) risks.push("人际关系可能存在问题");
    if (detailedScores.academic < 50) risks.push("学术资源可能不足");
    if (detailedScores.treatment < 50) risks.push("工作条件可能较差");
    if (detailedScores.prospect < 50) risks.push("发展前景可能有限");

    if (advisor.scores.workLife <= 2) risks.push("工作强度可能过大（996/007）");
    if (advisor.scores.graduation <= 2) risks.push("毕业要求可能过于严格");
    if (advisor.scores.funding <= 2) risks.push("课题组资金可能严重不足");
    if (advisor.scores.personality <= 2) risks.push("导师人品可能存在严重问题");

    let suggestion = "";
    if (totalScore >= 80) {
      suggestion = "强烈推荐，这是一个很好的选择！";
    } else if (totalScore >= 70) {
      suggestion = "总体不错，可以考虑选择。";
    } else if (totalScore >= 60) {
      suggestion =
        lowScoreItems.length > 0
          ? `有一定风险，特别注意${lowScoreItems.slice(0, 2).join("和")}方面，建议多方面了解情况。`
          : "有一定风险，建议多方面了解情况。";
    } else {
      suggestion =
        lowScoreItems.length > 0
          ? `存在较大风险，${lowScoreItems.slice(0, 3).join("、")}等方面问题较多，建议谨慎考虑。`
          : "存在较大风险，建议谨慎考虑。";
    }

    return {
      advantages:
        advantages.length > 0
          ? [...new Set(advantages)]
          : ["需要更多信息来评估优势"],
      risks: risks.length > 0 ? [...new Set(risks)] : ["暂无明显风险"],
      suggestion,
    };
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const hasData = advisors.some(
        (advisor) =>
          advisor.nickname ||
          Object.values(advisor.scores).some((score) => score !== 3) ||
          advisor.degreeType ||
          advisor.advisorTitle ||
          advisor.schoolLevel,
      );

      if (hasData) {
        event.preventDefault();
        const message = t("messages.unsavedData");
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [advisors, t]);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-between items-start mb-4">
              <div></div>
              <div className="flex-1">
                <h1 className="text-5xl font-bold text-gray-900 mb-2">
                  {t("app.title")}
                </h1>
                <p className="text-xl text-gray-600 mb-4">
                  {t("app.subtitle")}
                </p>
              </div>
              <LanguageSwitcher currentLocale={locale} />
            </div>

            <div className="flex justify-center items-center gap-6">
              <Badge variant="outline" className="text-lg px-4 py-2">
                {t("app.version")}
              </Badge>
              <Button
                variant="outline"
                className="flex items-center gap-2 text-lg px-6 py-2"
                onClick={() =>
                  window.open(
                    "https://github.com/ktwu01/advisor-calculator",
                    "_blank",
                  )
                }
              >
                <Github className="h-5 w-5" />
                {t("buttons.github")}
              </Button>
              <Button
                variant="default"
                className="flex items-center gap-2 text-lg px-6 py-2 bg-green-600 hover:bg-green-700"
                onClick={() =>
                  window.open(
                    "https://github.com/ktwu01/advisor-calculator/fork",
                    "_blank",
                  )
                }
              >
                <GitFork className="h-5 w-5" />
                {t("buttons.fork")}
              </Button>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mb-8">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={importComparison}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  {t("buttons.importData")}
                  <Info className="h-3 w-3 ml-1" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("tooltips.importData")}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={exportComparison}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  {t("buttons.exportData")}
                  <Info className="h-3 w-3 ml-1" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("tooltips.exportData")}</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Comparison Grid */}
          <div
            className="grid gap-6"
            style={{ gridTemplateColumns: `repeat(${advisors.length}, 1fr)` }}
          >
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
                        placeholder={t("forms.advisorNickname", {
                          number: index + 1,
                        })}
                        value={advisor.nickname}
                        onChange={(e) =>
                          updateAdvisor(index, "nickname", e.target.value)
                        }
                        className="text-center text-lg font-semibold"
                      />
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 absolute right-2 top-2 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{t("tooltips.nickname")}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">
                      {t("advisorInfo.basicInfo")}
                    </h3>

                    <div className="space-y-3">
                      <Select
                        value={advisor.gender}
                        onValueChange={(value) =>
                          updateAdvisor(index, "gender", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t("forms.advisorGender")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">
                            {t("genders.male")}
                          </SelectItem>
                          <SelectItem value="female">
                            {t("genders.female")}
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <Select
                        value={advisor.ageRange}
                        onValueChange={(value) =>
                          updateAdvisor(index, "ageRange", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t("forms.ageRange")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="young">
                            {t("ageRanges.young")}
                          </SelectItem>
                          <SelectItem value="middle">
                            {t("ageRanges.middle")}
                          </SelectItem>
                          <SelectItem value="senior">
                            {t("ageRanges.senior")}
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <Select
                        value={advisor.degreeType}
                        onValueChange={(value) =>
                          updateAdvisor(index, "degreeType", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t("forms.degreeType")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="masters">
                            {t("degrees.masters")}
                          </SelectItem>
                          <SelectItem value="phd">
                            {t("degrees.phd")}
                          </SelectItem>
                          <SelectItem value="postdoc">
                            {t("degrees.postdoc")}
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <Select
                        value={advisor.advisorTitle}
                        onValueChange={(value) =>
                          updateAdvisor(index, "advisorTitle", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t("forms.advisorTitle")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nobel">
                            {t("titles.nobel")}
                          </SelectItem>
                          <SelectItem value="academician">
                            {t("titles.academician")}
                          </SelectItem>
                          <SelectItem value="changjiang">
                            {t("titles.changjiang")}
                          </SelectItem>
                          <SelectItem value="thousand">
                            {t("titles.thousand")}
                          </SelectItem>
                          <SelectItem value="distinguished">
                            {t("titles.distinguished")}
                          </SelectItem>
                          <SelectItem value="excellent">
                            {t("titles.excellent")}
                          </SelectItem>
                          <SelectItem value="normal">
                            {t("titles.normal")}
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <Select
                        value={advisor.schoolLevel}
                        onValueChange={(value) =>
                          updateAdvisor(index, "schoolLevel", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t("forms.schoolLevel")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="global_top">
                            {t("schoolLevels.global_top")}
                          </SelectItem>
                          <SelectItem value="national_top">
                            {t("schoolLevels.national_top")}
                          </SelectItem>
                          <SelectItem value="c9">
                            {t("schoolLevels.c9")}
                          </SelectItem>
                          <SelectItem value="985">
                            {t("schoolLevels.985")}
                          </SelectItem>
                          <SelectItem value="211">
                            {t("schoolLevels.211")}
                          </SelectItem>
                          <SelectItem value="regular">
                            {t("schoolLevels.regular")}
                          </SelectItem>
                          <SelectItem value="vocational">
                            {t("schoolLevels.vocational")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Evaluation Metrics */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">
                      {t("advisorInfo.evaluationMetrics")}
                    </h3>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {Object.entries(advisor.scores).map(([key, value]) => {
                        const options = getScoreOptions(key);
                        return (
                          <div key={key} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <Label className="text-sm">
                                {getScoreLabel(key)}
                              </Label>
                              <Badge variant="outline" className="text-xs">
                                {options[value - 1] || `${value}/5`}
                              </Badge>
                            </div>
                            <Slider
                              value={[value]}
                              onValueChange={(newValue) =>
                                updateAdvisor(
                                  index,
                                  `scores.${key}`,
                                  newValue[0],
                                )
                              }
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

                  {/* Weight Settings */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg border-b pb-2">
                        {t("advisorInfo.weightSystem")}
                      </h3>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="space-y-2">
                            <p>{t("tooltips.weights")}</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label className="text-sm">
                          {t("weights.school")}: {advisor.weights.school}%
                        </Label>
                        <Slider
                          value={[advisor.weights.school]}
                          onValueChange={(value) =>
                            updateAdvisor(index, "weights", {
                              school: value[0],
                              advisor: 100 - value[0],
                            })
                          }
                          min={0}
                          max={100}
                          step={5}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">
                          {t("weights.advisor")}: {advisor.weights.advisor}%
                        </Label>
                        <Slider
                          value={[advisor.weights.advisor]}
                          onValueChange={(value) =>
                            updateAdvisor(index, "weights", {
                              school: 100 - value[0],
                              advisor: value[0],
                            })
                          }
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

          {/* Comparison Results Summary */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                {t("results.comparisonSummary")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="grid gap-6"
                style={{
                  gridTemplateColumns: `repeat(${advisors.length}, 1fr)`,
                }}
              >
                {advisors.map((advisor, index) => {
                  const score = calculateScore(advisor);
                  const level = getScoreLevel(score);
                  const detailedScores = calculateDetailedScores(advisor);
                  return (
                    <div key={index} className="space-y-4">
                      {/* Basic info and total score */}
                      <div className="text-center space-y-2">
                        <h3 className="font-semibold text-lg">
                          {advisor.nickname ||
                            `${t("forms.advisorDefault", { number: index + 1 })}`}
                        </h3>
                        <div
                          className={`text-2xl font-bold px-4 py-2 rounded-lg ${level.color}`}
                        >
                          {score.toFixed(1)}
                          {t("units.points")}
                        </div>
                        <div className="text-sm text-gray-600">
                          {level.level}
                        </div>
                        <div className="text-xs text-gray-500">
                          {t("weights.currentConfig", {
                            school: advisor.weights.school,
                            advisor: advisor.weights.advisor,
                          })}
                        </div>
                      </div>

                      {/* Detailed scores */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm text-center">
                          {t("results.detailedAnalysis")}
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-blue-50 p-2 rounded-lg text-center">
                            <div className="text-lg font-bold text-blue-600">
                              {detailedScores.personality}
                            </div>
                            <div className="text-xs text-gray-600">
                              {t("results.personalityScore")}
                            </div>
                          </div>
                          <div className="bg-green-50 p-2 rounded-lg text-center">
                            <div className="text-lg font-bold text-green-600">
                              {detailedScores.academic}
                            </div>
                            <div className="text-xs text-gray-600">
                              {t("results.academicScore")}
                            </div>
                          </div>
                          <div className="bg-purple-50 p-2 rounded-lg text-center">
                            <div className="text-lg font-bold text-purple-600">
                              {detailedScores.treatment}
                            </div>
                            <div className="text-xs text-gray-600">
                              {t("results.treatmentScore")}
                            </div>
                          </div>
                          <div className="bg-orange-50 p-2 rounded-lg text-center">
                            <div className="text-lg font-bold text-orange-600">
                              {detailedScores.prospect}
                            </div>
                            <div className="text-xs text-gray-600">
                              {t("results.prospectScore")}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Detailed Analysis */}
                      <Collapsible>
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full flex items-center justify-between group"
                          >
                            <span>{t("buttons.viewAnalysis")}</span>
                            <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-3">
                          <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                            <h5 className="font-semibold text-sm">
                              详细分析报告
                            </h5>
                            <div className="space-y-2">
                              <p className="text-xs text-gray-700">
                                <strong>综合评价：</strong>
                                {advisor.nickname || "未设置昵称"}
                              </p>
                              <p className="text-xs text-gray-700">
                                基于您的评分，该导师在各项指标上的表现如上所示。
                              </p>
                            </div>

                            {(() => {
                              const analysis = getDetailedAnalysis(advisor);
                              return (
                                <div className="space-y-2">
                                  <div>
                                    <strong className="text-green-600 text-xs">
                                      主要优势：
                                    </strong>
                                    <ul className="text-xs text-gray-700 mt-1 ml-3">
                                      {analysis.advantages.map((adv, i) => (
                                        <li key={i} className="list-disc">
                                          {adv}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <strong className="text-red-600 text-xs">
                                      潜在风险：
                                    </strong>
                                    <ul className="text-xs text-gray-700 mt-1 ml-3">
                                      {analysis.risks.map((risk, i) => (
                                        <li key={i} className="list-disc">
                                          {risk}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <strong className="text-blue-600 text-xs">
                                      建议：
                                    </strong>
                                    <p className="text-xs text-gray-700 mt-1">
                                      {analysis.suggestion}
                                    </p>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 text-center">
                <div className="text-lg font-semibold mb-2">
                  {t("results.bestChoice")}
                </div>
                {(() => {
                  const scores = advisors.map((advisor, index) => ({
                    score: calculateScore(advisor),
                    name: advisor.nickname || `导师 ${index + 1}`,
                    index,
                  }));
                  const maxScore = Math.max(...scores.map((s) => s.score));
                  const bestScores = scores.filter((s) => s.score === maxScore);

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
                      🏆 {best.name} ({best.score.toFixed(1)}
                      {t("units.points")})
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
                onClick={() =>
                  window.open(
                    "https://github.com/ktwu01/advisor-calculator/fork",
                    "_blank",
                  )
                }
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
