import { useState } from 'react'
import Navbar from '../components/Navbar'
import ResumeUpload from '../components/ResumeUpload'
import JobDescription from '../components/JobDescription'
import LoadingAnimation from '../components/LoadingAnimation'
import Results from '../components/Results'
import Footer from '../components/Footer'

function AnalyzerPage() {
  const [resumeText, setResumeText] = useState('')
  const [jobText, setJobText] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [showResults, setShowResults] = useState(false)

  const requiredSections = [
    'Name', 'Phone', 'Email', 'Links', 'PROFESSIONAL SUMMARY', 'EDUCATION',
    'PROJECTS', 'CERTIFICATIONS', 'SKILLS', 'Computer Languages',
    'Software Packages', 'Co-curricular & POR'
  ]
  
  const sectionPatterns = [
    { name: 'header', regex: /^.*?(Phone|Email|LinkedIn)/i },
    { name: 'summary', regex: /\b(PROFESSIONAL\s+SUMMARY|SUMMARY|PROFILE|OBJECTIVE)\b/i },
    { name: 'education', regex: /\b(EDUCATION|ACADEMIC|QUALIFICATION|UNIVERSITY|COLLEGE|BACHELOR|MASTER|PHD|B\.TECH|M\.TECH)\b/i },
    { name: 'projects', regex: /\b(PROJECTS|PROJECT EXPERIENCE|PROJECT WORK)\b/i },
    { name: 'experience', regex: /\b(EXPERIENCE|WORK EXPERIENCE|EMPLOYMENT|WORK HISTORY)\b/i },
    { name: 'certifications', regex: /\b(CERTIFICATION|CERTIFICATIONS|CERTIFICATES|ACCREDITATION)\b/i },
    { name: 'skills', regex: /\b(SKILLS|TECHNICAL SKILLS|CORE COMPETENCIES)\b/i },
    { name: 'languages', regex: /\b(COMPUTER LANGUAGES|PROGRAMMING LANGUAGES|LANGUAGES|TECH STACK)\b/i },
    { name: 'software', regex: /\b(SOFTWARE|SOFTWARE PACKAGES|TOOLS|TECHNOLOGIES|PLATFORMS|FRAMEWORKS)\b/i },
    { name: 'activities', regex: /\b(CO-CURRICULAR|EXTRACURRICULAR|ACTIVITIES|ACHIEVEMENTS|POSITIONS OF RESPONSIBILITY|POR)\b/i }
  ]

  const parseResume = (text) => {
    const sections = {}
    sectionPatterns.forEach(p => sections[p.name] = [])
    
    let lines = text.split(/\n+/)
    if (lines.length < 5) lines = text.split(/(?:\s{2,}|\n+|•+|⋅+)/)
    lines = lines.filter(line => line.trim().length > 0)
    
    let headerEnd = 0
    for (let i = 0; i < Math.min(lines.length, 10); i++) {
      const line = lines[i].trim()
      if (/(Phone|Email|LinkedIn|Github|Contact)/i.test(line)) {
        sections.header.push(line)
        headerEnd = i
      } else if (sections.header.length > 0 && i <= headerEnd + 2) {
        sections.header.push(line)
      } else if (/(PROFESSIONAL\s+SUMMARY|SUMMARY|PROFILE|OBJECTIVE)/i.test(line)) {
        break
      }
    }
    
    let currentSection = 'header'
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue
      
      let foundNewSection = false
      for (const pattern of sectionPatterns) {
        if (pattern.regex.test(line)) {
          currentSection = pattern.name
          if (!sections[currentSection].includes(line)) {
            sections[currentSection].push(line)
          }
          foundNewSection = true
          break
        }
      }
      
      if (!foundNewSection && i > headerEnd) {
        sections[currentSection].push(line)
      }
    }
    
    if (sections.skills.length <= 1) {
      for (const line of lines) {
        if (/(\w+\s*[,•|&])+\s*\w+/i.test(line) && 
            /\b(java|python|javascript|react|node|html|css|c\+\+|sql|git|docker)\b/i.test(line)) {
          sections.skills.push(line)
        }
      }
    }
    
    const allText = lines.join(' ')
    if (sections.languages.length <= 1) {
      const langs = [...allText.matchAll(/(java\s*script|python|java|c\+\+|c#|ruby|typescript|php|swift|kotlin|go|rust|scala|perl)/gi)]
        .map(match => match[0])
      if (langs.length) sections.languages.push('Computer Languages: ' + langs.join(', '))
    }
    
    if (sections.software.length <= 1) {
      const software = [...allText.matchAll(/(react|angular|vue|node|express|django|flask|spring|laravel|wordpress|mongodb|mysql|postgresql|firebase|aws|azure|docker|kubernetes)/gi)]
        .map(match => match[0])
      if (software.length) sections.software.push('Software Packages: ' + software.join(', '))
    }
    
    return sections
  }

  const checkStructure = (text) => {
    const sections = parseResume(text)
    const results = []
    
    const sectionMapping = {
      'summary': 'PROFESSIONAL SUMMARY',
      'education': 'EDUCATION',
      'projects': 'PROJECTS',
      'experience': 'EXPERIENCE',
      'certifications': 'CERTIFICATIONS',
      'skills': 'SKILLS',
      'languages': 'Computer Languages',
      'software': 'Software Packages',
      'activities': 'Co-curricular & POR'
    }
    
    const firstLine = text.split('\n')[0]
    results.push({ section: 'Name', exists: /^\s*([A-Z][a-z]+\s+([A-Z]\.?\s+)?[A-Z][a-z]+)/.test(firstLine) })
    results.push({ section: 'Phone', exists: /(\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(text) })
    results.push({ section: 'Email', exists: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text) })
    results.push({ section: 'Links', exists: /(LinkedIn|Github|HackerRank|CodeChef|Codeforces|LeetCode|Portfolio|Website)/i.test(text) })
    
    for (const [key, section] of Object.entries(sectionMapping)) {
      results.push({ section, exists: sections[key] && sections[key].length > 0 })
    }
    
    const essentialSections = ['Name', 'Email', 'PROFESSIONAL SUMMARY', 'EDUCATION', 'SKILLS']
    let essentialCount = 0, otherCount = 0
    
    for (const result of results) {
      if (essentialSections.includes(result.section)) {
        if (result.exists) essentialCount++
      } else if (result.exists) {
        otherCount++
      }
    }
    
    const score = ((essentialCount / essentialSections.length) * 0.7 + 
                   (otherCount / (results.length - essentialSections.length)) * 0.3) * 100
    
    return { items: results, score, sections }
  }

  
  const checkGrammar = async (sections) => {
    try {
      const sectionsToCheck = ['summary', 'projects', 'education']
      const textToCheck = sectionsToCheck.reduce((text, section) => {
        if (sections[section] && sections[section].length) {
          return text + sections[section].join(' ') + ' '
        }
        return text
      }, '').trim()
      
      if (!textToCheck) return { issues: [], score: 100 }
      
      const response = await fetch('https://api.languagetool.org/v2/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'text': textToCheck,
          'language': 'en-US',
          'disabledRules': 'WHITESPACE_RULE,UPPERCASE_SENTENCE_START'
        })
      })
      
      const data = await response.json()
      return {
        issues: data.matches || [],
        score: data.matches ? Math.max(0, 100 - (data.matches.length * 5)) : 100
      }
    } catch (error) {
      console.error('Error checking grammar:', error)
      return { issues: [], score: 50 }
    }
  }

  
  const checkJobMatch = (resumeText, jobText) => {
    if (!jobText) return { matches: [], score: 0 }
    
    const resumeLower = resumeText.toLowerCase()
    const commonWords = ['and', 'the', 'for', 'with', 'that', 'have', 'this', 'are', 'from', 
      'your', 'will', 'you', 'our', 'who', 'should', 'must', 'can', 'able', 'they', 'them']
    
      
    const explicitTerms = jobText.split(/,|\n/)
      .map(term => term.trim())
      .filter(term => term.length > 0)
    
      
    const multiWordTerms = jobText.toLowerCase().match(/\b[a-z]+\s+[a-z]+\b/g) || []
    
    const allText = jobText.toLowerCase()
    const jobWords = [...new Set(allText
      .split(/[,.\s()\[\]]+/)
      .filter(word => word.length > 3 && !commonWords.includes(word)))]
    
    const allTerms = [...explicitTerms, ...multiWordTerms]
    
    for (const word of jobWords) {
      if (!multiWordTerms.some(term => term.includes(word))) {
        allTerms.push(word)
      }
    }
    
    const uniqueTerms = [...new Set(allTerms)]
    
    const matches = uniqueTerms.map(term => ({
      keyword: term.trim(),
      exists: resumeLower.includes(term.toLowerCase())
    }))
    
    const matchCount = matches.filter(m => m.exists).length
    const score = uniqueTerms.length ? (matchCount / uniqueTerms.length) * 100 : 0
    
    return { matches, score }
  }

  const handleAnalyze = async () => {
    if (!resumeText || !jobText) {
      alert('Please provide both resume and job description')
      return
    }
    
    setLoading(true)
    setShowResults(false)
    
    try {
      const structureResult = checkStructure(resumeText)
      
      const grammarResult = await checkGrammar(structureResult.sections)
    
      const jobMatchResult = checkJobMatch(resumeText, jobText)
      
      const overallScore = (
        structureResult.score * 0.3 + 
        grammarResult.score * 0.3 + 
        jobMatchResult.score * 0.4
      )
      
      setResults({
        structure: structureResult,
        grammar: grammarResult,
        jobMatch: jobMatchResult,
        overallScore: overallScore
      })
      
      setShowResults(true)
    } catch (error) {
      console.error('Analysis error:', error)
      alert('An error occurred during analysis. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-fluid d-flex flex-column min-vh-100 p-0">
      <Navbar activePage="analyzer" />
      
      <div className="border-bottom w-100"></div>
      
      <main className="container my-4 flex-grow-1">
        <div className="row">
          <div className="col-md-6">
            <ResumeUpload 
              resumeText={resumeText} 
              setResumeText={setResumeText}
            />
          </div>
          
          <div className="col-md-6">
            <JobDescription 
              jobText={jobText} 
              setJobText={setJobText}
            />
          </div>
        </div>
        
        <div className="row justify-content-center mb-4">
          <div className="col-md-4 text-center">
            <button 
              className="btn btn-primary btn-lg w-100"
              onClick={handleAnalyze}
            >
              <i className="fas fa-check-circle me-2"></i>Analyze Resume
            </button>
          </div>
        </div>
        
        {loading && <LoadingAnimation />}
        
        {showResults && results && (
          <Results results={results} />
        )}
      </main>
      
      <Footer />
    </div>
  )
}

export default AnalyzerPage