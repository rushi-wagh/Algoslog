import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import {
  Play,
  FileText,
  MessageSquare,
  Lightbulb,
  Bookmark,
  Share2,
  Clock,
  ChevronRight,
  Terminal,
  Code2,
  Users,
  ThumbsUp,
  Home,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useProblemStore } from "../store/useProblemStore";
import { getLanguageId } from "../lib/lang";
import { useExecutionStore } from "../store/useExecutionStore";
import { useSubmissionStore } from "../store/useSubmissionStore";
import Submission from "../components/Submission";
import SubmissionsList from "../components/SubmissionList";

const ProblemPage = () => {
  const { id } = useParams();
  const { getProblemById, problem, isProblemLoading } = useProblemStore();

  const {
    submission: submissions,
    isLoading: isSubmissionsLoading,
    getSubmissionForProblem,
    getSubmissionCountForProblem,
    submissionCount,
  } = useSubmissionStore();

  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [testcases, setTestCases] = useState([]);

  const { executeCode, submission, isExecuting } = useExecutionStore();

  const calledRef = useRef(false);

  

  useEffect(() => {
    if (!calledRef.current) {
      getProblemById(id);
      calledRef.current = true;
    }
     getSubmissionCountForProblem(id);
  }, [id]);

  useEffect(() => {
  if (submission && id) {
    getSubmissionCountForProblem(id);
  }
}, [submission, id]);

  useEffect(() => {
    if (problem) {
      setCode(
        problem.codeSnippets?.[selectedLanguage] || submission?.sourceCode || ""
      );
      setTestCases(
        problem.testcases?.map((tc) => ({
          input: tc.input,
          output: tc.output,
        })) || []
      );
    }
  }, [problem, selectedLanguage]);

  useEffect(() => {
    if (activeTab === "submissions" && id) {
      getSubmissionForProblem(id);
    }
  }, [activeTab, id]);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setSelectedLanguage(lang);
    setCode(problem.codeSnippets?.[lang] || "");
  };

  const handleRunCode = (e) => {
    e.preventDefault();
    try {
      const language_id = getLanguageId(selectedLanguage);
      const stdin = problem.testcases.map((tc) => tc.input);
      const expected_outputs = problem.testcases.map((tc) => tc.output);
      executeCode(code, language_id, stdin, expected_outputs, id);
    } catch (error) {
      console.log("Error executing code", error);
    }
  };

  if (isProblemLoading || !problem) {
    return (
      <div className="flex items-center justify-center h-screen w-full  bg-[#E1E9C9]">
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <span className="loading loading-spinner loading-lg text-[#5C9EA3]"></span>
          <p className="mt-4 text-gray-600">Loading problem...</p>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">{problem.description}</p>

            {problem.examples && (
              <>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  Examples:
                </h3>
                {Object.entries(problem.examples).map(([lang, example], idx) => (
                  <div
                    key={lang}
                    className="bg-[#E6F3F6] p-6 rounded-2xl mb-6 font-mono shadow-sm"
                  >
                    <div className="mb-4">
                      <div className="text-[#5C9EA3] mb-2 font-semibold">
                        Input:
                      </div>
                      <span className="bg-gray-800 px-4 py-1 rounded-lg font-semibold text-white">
                        {example.input}
                      </span>
                    </div>
                    <div className="mb-4">
                      <div className="text-[#5C9EA3] mb-2 font-semibold">
                        Output:
                      </div>
                      <span className="bg-gray-800 px-4 py-1 rounded-lg font-semibold text-white">
                        {example.output}
                      </span>
                    </div>
                    {example.explanation && (
                      <div>
                        <div className="text-green-600 mb-2 font-semibold">
                          Explanation:
                        </div>
                        <p className="text-gray-700">{example.explanation}</p>
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}

            {problem.constraints && (
              <>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  Constraints:
                </h3>
                <div className="bg-[#E6F3F6] p-6 rounded-2xl shadow-sm">
                  <span className="bg-gray-800 px-4 py-1 rounded-lg font-semibold text-white text-lg">
                    {problem.constraints}
                  </span>
                </div>
              </>
            )}
          </div>
        );
      case "submissions":
        return (
          <SubmissionsList
            submissions={submissions}
            isLoading={isSubmissionsLoading}
          />
        );
      case "discussion":
        return (
          <div className="p-4 text-center text-gray-500">
            No discussions yet
          </div>
        );
      case "hints":
        return (
          <div className="p-4">
            {problem?.hints ? (
              <div className="bg-[#E6F3F6] p-6 rounded-2xl shadow-sm">
                <span className="bg-gray-800 px-4 py-1 rounded-lg font-semibold text-white text-lg">
                  {problem.hints}
                </span>
              </div>
            ) : (
              <div className="text-center text-gray-500">No hints available</div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#E1E9C9] px-4 py-6">
      {/* Navbar */}
      <nav className="bg-white rounded-2xl shadow-md p-4 mb-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link to={"/"} className="flex items-center gap-2 text-[#5C9EA3]">
            <Home className="w-6 h-6" />
            <ChevronRight className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-800">{problem.title}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <Clock className="w-4 h-4" />
              <span>
                Updated{" "}
                {new Date(problem.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="text-gray-400">•</span>
              <Users className="w-4 h-4" />
              <span>{submissionCount} Submissions</span>
              <span className="text-gray-400">•</span>
              <ThumbsUp className="w-4 h-4" />
              <span>95% Success Rate</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            className={`p-2 rounded-full hover:bg-gray-100 ${
              isBookmarked ? "text-[#5C9EA3]" : "text-gray-600"
            }`}
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
            <Share2 className="w-5 h-5" />
          </button>
          <select
            className="border rounded-lg px-3 py-2 text-sm bg-[#E6F3F6] text-gray-800"
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            {Object.keys(problem.codeSnippets || {}).map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </nav>

     
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Panel */}
        <div className="lg:col-span-5 bg-white rounded-2xl shadow-md">
          <div className="border-b flex">
            {["description", "submissions", "discussion", "hints"].map((tab) => {
              const icons = {
                description: <FileText className="w-4 h-4" />,
                submissions: <Code2 className="w-4 h-4" />,
                discussion: <MessageSquare className="w-4 h-4" />,
                hints: <Lightbulb className="w-4 h-4" />,
              };
              return (
                <button
                  key={tab}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition ${
                    activeTab === tab
                      ? "border-b-2 border-[#5C9EA3] text-[#5C9EA3]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {icons[tab]}
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              );
            })}
          </div>
          <div className="p-6">{renderTabContent()}</div>
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-7 bg-white rounded-2xl shadow-md flex flex-col">
          <div className="border-b px-4 py-3 flex items-center gap-2 text-[#5C9EA3] font-medium">
            <Terminal className="w-4 h-4" />
            Code Editor
          </div>
          <div className="flex-1">
            <Editor
              height="760px"
              language={selectedLanguage.toLowerCase()}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 18,
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>
          <div className="p-4 border-t flex justify-between items-center bg-[#E6F3F6] rounded-b-2xl">
            <button
              className={`px-5 py-2 rounded-lg bg-[#5C9EA3] text-white font-medium hover:bg-[#4A7E82] transition flex items-center gap-2 ${
                isExecuting ? "opacity-70 cursor-not-allowed" : ""
              }`}
              onClick={handleRunCode}
              disabled={isExecuting}
            >
              {!isExecuting && <Play className="w-4 h-4" />}
              Run Code
            </button>
            <button className="px-5 py-2 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition">
              Submit Solution
            </button>
          </div>
        </div>
      </div>

      {/* Test Cases */}
      <div className="bg-white rounded-2xl shadow-md mt-6 p-6">
        {submission ? (
          <Submission submission={submission} />
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Test Cases</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border rounded-lg overflow-hidden">
                <thead className="bg-[#E6F3F6] text-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left">Input</th>
                    <th className="px-4 py-2 text-left">Expected Output</th>
                  </tr>
                </thead>
                <tbody>
                  {testcases.map((testCase, index) => (
                    <tr
                      key={index}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-2 font-mono text-gray-600">
                        {testCase.input}
                      </td>
                      <td className="px-4 py-2 font-mono text-gray-600">
                        {testCase.output}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProblemPage;
