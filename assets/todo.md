** 待办事项 **


> still missing i cannot see any of these once i use `npm run dev`\
  ``` ALL the select components ARE actually working and rendered correctly:

    ✅ Advisor Type - Select with 5 options (Research-Focused, Teaching-Focused, etc.)✅ Degree - Now converted to Select with 5 options (Associate,
    Bachelor's, Master's, PhD, Postdoc)✅ Field - Input field (correctly remains as text input)✅ Gender - Select (Male/Female)✅ Age Range - Select
    (Young/Mid-career/Senior Faculty)✅ Degree Program - Select (Master's/PhD/Postdoc)✅ Advisor Title - Select (Nobel/Academician/etc.)✅ School 
  Level
    - Select (Global Top/National Top/etc.)\
  \
  ```\
  what can i do ???? did you use curl 3001
  did i missing some modules?

  TODO 2: Fix degree field (English only)

  - Location: src/components/AdvisorCalculator.tsx line ~548-552
  - Action: Replace Input component with Select component
  - Requirements:
    - Create predefined options that can add/subtract points
    - Add translation keys for degree options
    - Implement scoring logic for degree selections

  TODO 3: Keep field as Input (Already Correct)

  - Location: src/components/AdvisorCalculator.tsx line ~554-558
  - Status: ✅ Already implemented correctly as Input field
  - Action: No changes needed

  TODO 4: Add Translation Keys (English only)

  - Files:
    - src/i18n/locales/en.json
  - Action: Add translation sections for:
    - advisorTypes (with scoring options)
    - degrees (with scoring options)

  TODO 5: Implement Scoring Logic

  - Location: src/components/AdvisorCalculator.tsx (scoring calculation functions)
  - Action: Add scoring modifiers for advisorType and degree selections
  - Requirements: Different options should add/subtract different point values
add to claude.
make a thourough algo.md in root.

  TODO 6: Update Default Values

  - Location: src/components/AdvisorCalculator.tsx line ~52-85 (defaultAdvisorData)
  - Action: Ensure default values work with Select components instead of Input fields

  The key issue is that advisorType and degree are currently implemented as free-text Input fields but should be Select dropdowns with predefined
  scoring options, following the same pattern as gender, ageRange, degreeType, advisorTitle, and schoolLevel.

[] 需要改进英文readme。
[] 目前有一个问题就是，劣势造成的影响往往比优势带来的优点更大，假定为2倍。你结合进行算法的改进。

4. "lab size" should follow the same algo of gender: too many or too less are both bad.\
5. smart weight system should based on "degree" choice of "basic info", as in legacy page.\
6. should provide "details (collapsible)" in the buttom of the page like what "readme.cn.md" in the root folder.\\

add lang switch buttom. try to let all pages in one website for SEO.