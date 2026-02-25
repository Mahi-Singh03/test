# scaffold-quiz-data.ps1
# Creates the complete data/mini-quiz folder tree matching every paper, subject,
# category, and topic defined in src/config/subjects.js.
#
# Convention:
#   - Categories WITH defined topics  → one subfolder per topic
#   - Categories with topics:[]      → one "general" topic subfolder
#
# Run from the project root: powershell -File scaffold-quiz-data.ps1

$base = "src\data\mini-quiz"

function Write-Meta($path, $label, $description, $icon) {
    $meta = @{ label = $label; description = $description; icon = $icon } | ConvertTo-Json -Compress
    Set-Content -Path "$path\_meta.json" -Value $meta -Encoding UTF8
}

function Ensure($path) {
    New-Item -ItemType Directory -Force -Path $path | Out-Null
}

# ═══════════════════════════════════════════════
#  PAPER 1
# ═══════════════════════════════════════════════
$p1 = "$base\paper-1"
Ensure $p1
Write-Meta $p1 "Paper 1" "General Awareness, Quantitative Aptitude, Punjabi Language" "📄"

# ──────────────────────────────────────────────
#  PAPER 1 › GENERAL AWARENESS
# ──────────────────────────────────────────────
$ga = "$p1\general-awareness"
Ensure $ga
Write-Meta $ga "General Awareness" "History, polity, geography & current affairs" "🌍"

# Indian Polity — has topics
$ip = "$ga\indian-polity"
Ensure $ip
Write-Meta $ip "Indian Polity" "Constitution, rights, parliament & judiciary" "⚖️"
@("constitution-features","fundamental-rights-duties","parliament-state-legislature","executive-system","judiciary","panchayati-raj") | ForEach-Object {
    $names = @{
        "constitution-features"           = "Constitution Features"
        "fundamental-rights-duties"       = "Fundamental Rights & Duties"
        "parliament-state-legislature"    = "Parliament & State Legislature"
        "executive-system"                = "Executive System"
        "judiciary"                       = "Judiciary"
        "panchayati-raj"                  = "Panchayati Raj"
    }
    Ensure "$ip\$_"; Write-Meta "$ip\$_" $names[$_] "Practice $($names[$_])" "📌"
}

# History — has topics
$hist = "$ga\history"
Ensure $hist
Write-Meta $hist "History" "Ancient, medieval, modern & Punjab history" "🏛️"
@("ancient-india","medieval-india","modern-india","freedom-movement","punjab-history-culture") | ForEach-Object {
    $names = @{
        "ancient-india"           = "Ancient India"
        "medieval-india"          = "Medieval India"
        "modern-india"            = "Modern India"
        "freedom-movement"        = "Freedom Movement"
        "punjab-history-culture"  = "Punjab History & Culture"
    }
    Ensure "$hist\$_"; Write-Meta "$hist\$_" $names[$_] "Practice $($names[$_])" "📜"
}

# Geography & Environment — has topics
$geo = "$ga\geography-environment"
Ensure $geo
Write-Meta $geo "Geography & Environment" "Indian & Punjab geography, climate & ecology" "🗺️"
@("indian-geography","punjab-geography","climate-natural-resources","environment-ecology") | ForEach-Object {
    $names = @{
        "indian-geography"          = "Indian Geography"
        "punjab-geography"          = "Punjab Geography"
        "climate-natural-resources" = "Climate & Natural Resources"
        "environment-ecology"       = "Environment & Ecology"
    }
    Ensure "$geo\$_"; Write-Meta "$geo\$_" $names[$_] "Practice $($names[$_])" "🌿"
}

# Economy — has topics
$econ = "$ga\economy"
Ensure $econ
Write-Meta $econ "Economy" "Indian economy, banking & government schemes" "💰"
@("indian-economy","banking-awareness","economic-development","government-schemes") | ForEach-Object {
    $names = @{
        "indian-economy"       = "Indian Economy"
        "banking-awareness"    = "Banking Awareness"
        "economic-development" = "Economic Development"
        "government-schemes"   = "Government Schemes"
    }
    Ensure "$econ\$_"; Write-Meta "$econ\$_" $names[$_] "Practice $($names[$_])" "📊"
}

# Science & Technology — has topics
$sci = "$ga\science-technology"
Ensure $sci
Write-Meta $sci "Science & Technology" "Physics, chemistry, biology & technology" "🔬"
@("physics","chemistry","biology","everyday-science","recent-tech") | ForEach-Object {
    $names = @{
        "physics"          = "Physics"
        "chemistry"        = "Chemistry"
        "biology"          = "Biology"
        "everyday-science" = "Everyday Science"
        "recent-tech"      = "Recent Technology"
    }
    Ensure "$sci\$_"; Write-Meta "$sci\$_" $names[$_] "Practice $($names[$_])" "⚗️"
}

# Current Affairs — has topics
$ca = "$ga\current-affairs"
Ensure $ca
Write-Meta $ca "Current Affairs" "National, international, sports & awards" "📰"
@("national","international","sports","awards","policies","legal-updates") | ForEach-Object {
    $names = @{
        "national"      = "National"
        "international" = "International"
        "sports"        = "Sports"
        "awards"        = "Awards"
        "policies"      = "Policies"
        "legal-updates" = "Legal Updates"
    }
    Ensure "$ca\$_"; Write-Meta "$ca\$_" $names[$_] "Practice $($names[$_])" "🗞️"
}

# Social Awareness — has topics
$soc = "$ga\social-awareness"
Ensure $soc
Write-Meta $soc "Social Awareness" "Diversity, ethics & social issues" "🤝"
@("diversity","vulnerable-sections","ethics","social-issues") | ForEach-Object {
    $names = @{
        "diversity"           = "Diversity"
        "vulnerable-sections" = "Vulnerable Sections"
        "ethics"              = "Ethics"
        "social-issues"       = "Social Issues"
    }
    Ensure "$soc\$_"; Write-Meta "$soc\$_" $names[$_] "Practice $($names[$_])" "💬"
}

# ──────────────────────────────────────────────
#  PAPER 1 › QUANTITATIVE APTITUDE
# ──────────────────────────────────────────────
$qa = "$p1\quantitative-aptitude"
Ensure $qa
Write-Meta $qa "Quantitative Aptitude" "Arithmetic, algebra, mensuration & more" "🔢"

$qaCategories = @{
    "number-system"      = @{ label="Number System";          icon="🔢"; desc="LCM, HCF, factors & number types" }
    "simplification"     = @{ label="Simplification";         icon="➗"; desc="BODMAS, fractions & calculations" }
    "decimals-fractions" = @{ label="Decimals & Fractions";   icon="½";  desc="Decimal operations & fraction arithmetic" }
    "percentage"         = @{ label="Percentage";             icon="%";  desc="Percentage calculations & applications" }
    "ratio-proportion"   = @{ label="Ratio & Proportion";     icon="⚖️"; desc="Ratios, proportions, partnerships & mixtures" }
    "averages"           = @{ label="Averages";               icon="📊"; desc="Mean, weighted average & related problems" }
    "profit-loss"        = @{ label="Profit & Loss";          icon="💹"; desc="CP, SP, profit, loss & discount" }
    "simple-interest"    = @{ label="Simple Interest";        icon="🏦"; desc="SI formula & applications" }
    "compound-interest"  = @{ label="Compound Interest";      icon="📈"; desc="CI formula, half-yearly & quarterly" }
    "time-work"          = @{ label="Time & Work";            icon="⏳"; desc="Work rate, pipes and efficiency problems" }
    "pipes-cisterns"     = @{ label="Pipes & Cisterns";       icon="🚿"; desc="Filling, emptying & combined flow" }
    "time-speed-distance"= @{ label="Time, Speed & Distance"; icon="🚂"; desc="TSD, trains, boats & streams" }
    "mensuration"        = @{ label="Mensuration";            icon="📐"; desc="Area, perimeter, volume & surface area" }
    "speed-maths"        = @{ label="Speed Maths";            icon="⚡"; desc="Fast calculation & approximation tricks" }
}

foreach ($catId in $qaCategories.Keys) {
    $info = $qaCategories[$catId]
    $catPath = "$qa\$catId"
    Ensure $catPath
    Write-Meta $catPath $info.label $info.desc $info.icon
    # No sub-topics → "general" topic folder
    Ensure "$catPath\general"
    Write-Meta "$catPath\general" "General" "All-round $($info.label) practice" "📂"
}

# ──────────────────────────────────────────────
#  PAPER 1 › PUNJABI LANGUAGE
# ──────────────────────────────────────────────
$pun = "$p1\punjabi-language"
Ensure $pun
Write-Meta $pun "Punjabi Language" "Grammar, vocabulary & comprehension" "✍️"

$punCategories = @{
    "grammar"            = @{ label="Grammar";            icon="📝"; desc="ਵਿਆਕਰਣ — rules & applications" }
    "vocabulary"         = @{ label="Vocabulary";         icon="📖"; desc="Word meanings & usage" }
    "sentence-formation" = @{ label="Sentence Formation"; icon="🖊️"; desc="Correct sentence construction" }
    "error-detection"    = @{ label="Error Detection";    icon="🔍"; desc="Spot grammar & spelling errors" }
    "comprehension"      = @{ label="Comprehension";      icon="📰"; desc="Passage reading & understanding" }
}

foreach ($catId in $punCategories.Keys) {
    $info = $punCategories[$catId]
    $catPath = "$pun\$catId"
    Ensure $catPath
    Write-Meta $catPath $info.label $info.desc $info.icon
    Ensure "$catPath\general"
    Write-Meta "$catPath\general" "General" "All-round $($info.label) practice" "📂"
}

# ═══════════════════════════════════════════════
#  PAPER 2
# ═══════════════════════════════════════════════
$p2 = "$base\paper-2"
Ensure $p2
Write-Meta $p2 "Paper 2" "Logical Reasoning, Digital Literacy, English Language" "📋"

# ──────────────────────────────────────────────
#  PAPER 2 › LOGICAL REASONING
# ──────────────────────────────────────────────
$lr = "$p2\logical-reasoning"
Ensure $lr
Write-Meta $lr "Logical Reasoning" "Patterns, sequences, puzzles & more" "🧩"

$lrCategories = @{
    "analogy"              = @{ label="Analogy";              icon="🔗"; desc="Word and number analogy" }
    "classification"       = @{ label="Classification";       icon="🗂️"; desc="Odd one out & grouping" }
    "coding-decoding"      = @{ label="Coding & Decoding";    icon="🔐"; desc="Letter and number codes" }
    "series"               = @{ label="Series";               icon="🔢"; desc="Number, letter & mixed series" }
    "syllogism"            = @{ label="Syllogism";            icon="💡"; desc="Premises and conclusions" }
    "blood-relations"      = @{ label="Blood Relations";      icon="👨‍👩‍👧"; desc="Family relationship problems" }
    "direction-sense"      = @{ label="Direction Sense";      icon="🧭"; desc="Distance and direction problems" }
    "ranking"              = @{ label="Ranking";              icon="🏆"; desc="Position and rank ordering" }
    "seating-arrangement"  = @{ label="Seating Arrangement";  icon="🪑"; desc="Linear and circular arrangements" }
    "puzzles"              = @{ label="Puzzles";              icon="🧩"; desc="Complex logical puzzles" }
    "missing-numbers"      = @{ label="Missing Numbers";      icon="❓"; desc="Find the missing term" }
    "data-sufficiency"     = @{ label="Data Sufficiency";     icon="📊"; desc="Is the data enough to answer?" }
    "calendars"            = @{ label="Calendars";            icon="📅"; desc="Days, dates & calendar problems" }
    "legal-reasoning"      = @{ label="Legal Reasoning";      icon="⚖️"; desc="Legal principles & case analysis" }
    "mirror-images"        = @{ label="Mirror Images";        icon="🪞"; desc="Reflections & image orientation" }
    "figure-matrix"        = @{ label="Figure Matrix";        icon="🔷"; desc="Pattern completion in figures" }
    "paper-folding"        = @{ label="Paper Folding";        icon="📄"; desc="Folding and punching patterns" }
}

foreach ($catId in $lrCategories.Keys) {
    $info = $lrCategories[$catId]
    $catPath = "$lr\$catId"
    Ensure $catPath
    Write-Meta $catPath $info.label $info.desc $info.icon
    Ensure "$catPath\general"
    Write-Meta "$catPath\general" "General" "All-round $($info.label) practice" "📂"
}

# Data Interpretation — has topics
$di = "$lr\data-interpretation"
Ensure $di
Write-Meta $di "Data Interpretation" "Graphs, charts, tables & spreadsheets" "📊"
@("graphs","charts","tables","spreadsheet") | ForEach-Object {
    $names = @{ "graphs"="Graphs"; "charts"="Charts"; "tables"="Tables"; "spreadsheet"="Spreadsheet" }
    Ensure "$di\$_"; Write-Meta "$di\$_" $names[$_] "DI from $($names[$_])" "📈"
}

# ──────────────────────────────────────────────
#  PAPER 2 › DIGITAL LITERACY
# ──────────────────────────────────────────────
$dl = "$p2\digital-literacy"
Ensure $dl
Write-Meta $dl "Digital Literacy" "Computers, internet, MS Office & cyber safety" "💻"

$dlCategories = @{
    "hardware-software"    = @{ label="Hardware & Software";    icon="🖥️"; desc="Components, types & functions" }
    "operating-systems"    = @{ label="Operating Systems";      icon="⚙️"; desc="Windows, Linux & OS concepts" }
    "input-output-devices" = @{ label="Input/Output Devices";   icon="⌨️"; desc="Keyboard, mouse, printers & more" }
    "ms-word"              = @{ label="MS Word";                icon="📝"; desc="Word processing & features" }
    "ms-excel"             = @{ label="MS Excel";               icon="📊"; desc="Spreadsheets, formulas & charts" }
    "powerpoint"           = @{ label="PowerPoint";             icon="📊"; desc="Presentations & slide design" }
    "internet-www"         = @{ label="Internet & WWW";         icon="🌐"; desc="Browsers, URLs & web basics" }
    "search-engines"       = @{ label="Search Engines";         icon="🔍"; desc="Google, search operators & tips" }
    "email"                = @{ label="Email";                  icon="📧"; desc="Email protocols & features" }
    "social-media"         = @{ label="Social Media";           icon="📱"; desc="Platforms, safety & etiquette" }
    "data-encryption"      = @{ label="Data Encryption";        icon="🔒"; desc="Cryptography & data security" }
    "cyber-security"       = @{ label="Cyber Security";         icon="🛡️"; desc="Threats, attacks & protection" }
    "online-safety"        = @{ label="Online Safety";          icon="✅"; desc="Safe browsing & digital hygiene" }
}

foreach ($catId in $dlCategories.Keys) {
    $info = $dlCategories[$catId]
    $catPath = "$dl\$catId"
    Ensure $catPath
    Write-Meta $catPath $info.label $info.desc $info.icon
    Ensure "$catPath\general"
    Write-Meta "$catPath\general" "General" "All-round $($info.label) practice" "📂"
}

# ──────────────────────────────────────────────
#  PAPER 2 › ENGLISH LANGUAGE
# ──────────────────────────────────────────────
$en = "$p2\english-language"
Ensure $en
Write-Meta $en "English Language" "Grammar, vocabulary, comprehension & writing" "📖"

$enCategories = @{
    "tenses"                 = @{ label="Tenses";                  icon="⏰"; desc="Simple, continuous, perfect tenses" }
    "articles"               = @{ label="Articles";                icon="🔤"; desc="a, an, the — rules & usage" }
    "prepositions"           = @{ label="Prepositions";            icon="📍"; desc="In, on, at, by — correct usage" }
    "voice-narration"        = @{ label="Voice & Narration";       icon="🎙️"; desc="Active/passive & direct/indirect" }
    "subject-verb-agreement" = @{ label="Subject-Verb Agreement";  icon="✅"; desc="Singular & plural agreements" }
    "synonyms"               = @{ label="Synonyms";                icon="🔄"; desc="Words with similar meanings" }
    "antonyms"               = @{ label="Antonyms";                icon="↔️"; desc="Words with opposite meanings" }
    "idioms-phrases"         = @{ label="Idioms & Phrases";        icon="💬"; desc="Common idioms & their meanings" }
    "one-word-substitution"  = @{ label="One Word Substitution";   icon="🔤"; desc="Replace phrases with one word" }
    "spelling"               = @{ label="Spelling";                icon="✏️"; desc="Correct spelling & common errors" }
    "reading-comprehension"  = @{ label="Reading Comprehension";   icon="📰"; desc="Passage reading & inference" }
    "sentence-rearrangement" = @{ label="Sentence Rearrangement";  icon="🔀"; desc="Jumbled sentences & para ordering" }
    "error-detection"        = @{ label="Error Detection";         icon="🔍"; desc="Spot grammatical errors in sentences" }
    "fill-in-blanks"         = @{ label="Fill in the Blanks";      icon="📝"; desc="Choose the correct word" }
    "translation"            = @{ label="Translation";             icon="🌐"; desc="English-Punjabi/Hindi translation" }
    "precis-writing"         = @{ label="Precis Writing";          icon="✍️"; desc="Summarising passages precisely" }
}

foreach ($catId in $enCategories.Keys) {
    $info = $enCategories[$catId]
    $catPath = "$en\$catId"
    Ensure $catPath
    Write-Meta $catPath $info.label $info.desc $info.icon
    Ensure "$catPath\general"
    Write-Meta "$catPath\general" "General" "All-round $($info.label) practice" "📂"
}

Write-Host ""
Write-Host "✅ All folders and _meta.json files created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📁 Structure: src/data/mini-quiz/{paper}/{subject}/{category}/{topic}/" -ForegroundColor Cyan
Write-Host "📄 To add quiz: drop set-1.json (or set-2.json, etc.) into the topic folder" -ForegroundColor Cyan
Write-Host ""
