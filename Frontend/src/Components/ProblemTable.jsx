import React, { useState, useMemo } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Bookmark, PencilIcon, TrashIcon, Plus, CheckCircle, Circle } from "lucide-react";
import { useActions } from "../store/useAction";
import AddToPlaylistModal from "./AddToPlaylist";
import CreatePlaylistModal from "./CreatePlaylistModal";
import { usePlaylistStore } from "../store/usePlaylistStore";
import { useProblemStore } from "../store/useProblemStore";

const ProblemsTable = ({ problems }) => {
  const { authUser } = useAuthStore();
  const { onDeleteProblem } = useActions();
  const { createPlaylist } = usePlaylistStore();
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("ALL");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] = useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState(null);

  // Extract unique tags
  const allTags = useMemo(() => {
    if (!Array.isArray(problems)) return [];
    const tagsSet = new Set();
    problems.forEach((p) => p.tags?.forEach((t) => tagsSet.add(t)));
    return Array.from(tagsSet);
  }, [problems]);

  const difficulties = ["EASY", "MEDIUM", "HARD"];

  // Filtering
  const filteredProblems = useMemo(() => {
    return (problems || [])
      .filter((problem) =>
        problem.title.toLowerCase().includes(search.toLowerCase())
      )
      .filter((problem) =>
        difficulty === "ALL" ? true : problem.difficulty === difficulty
      )
      .filter((problem) =>
        selectedTag === "ALL" ? true : problem.tags?.includes(selectedTag)
      );
  }, [problems, search, difficulty, selectedTag]);

  // Pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);
  const paginatedProblems = useMemo(() => {
    return filteredProblems.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredProblems, currentPage]);

  const handleDelete = (id) => {
    onDeleteProblem(id);
  };

  const handleCreatePlaylist = async (data) => {
    await createPlaylist(data);
  };

  const handleAddToPlaylist = (problemId) => {
    setSelectedProblemId(problemId);
    setIsAddToPlaylistModalOpen(true);
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-800">Problems</h2>
        <button
          className="px-4 py-2 rounded-xl bg-[#239BA7] hover:bg-orange-700 text-white font-semibold flex items-center gap-2 shadow-md"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="w-5 h-5" />
          Create Playlist
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by title..."
          className="px-3 py-2 bg-[#CADCAE] text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="px-3 py-2 rounded-lg border border-gray-300 bg-[#CADCAE] text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="ALL">All Difficulties</option>
          {difficulties.map((diff) => (
            <option key={diff} value={diff}>
              {diff.charAt(0) + diff.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
        <select
          className="px-3 py-2 rounded-lg border border-gray-300 bg-[#CADCAE] text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          <option value="ALL">All Tags</option>
          {allTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl shadow-lg ">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#CADCAE] text-gray-700 text-sm uppercase">
              <th className="px-4 py-3">Solved</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Tags</th>
              <th className="px-4 py-3">Difficulty</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProblems.length > 0 ? (
              paginatedProblems.map((problem) => {
                const isSolved = problem.solvedBy.some(
                  (user) => user.userId === authUser?.id
                );
                return (
                  <tr
                    key={problem.id}
                    className="hover:bg-[#7ADAA5] transition bg-[#CADCAE]"
                  >
                    <td className="px-4 py-3">
                      {isSolved ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400" />
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/problem/${problem.id}`}
                        className="font-semibold text-gray-800 hover:underline"
                      >
                        {problem.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        {(problem.tags || []).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 rounded-full bg-[#9ECAD6] text-[#113F67] text-xs font-semibold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 h-auto rounded-full text-xs font-bold ${
                          problem.difficulty === "EASY"
                            ? "bg-[#78C841] h-auto text-gray-100"
                            : problem.difficulty === "MEDIUM"
                            ? "bg-yellow-300 text-yellow-900"
                            : "bg-red-300 text-red-900"
                        }`}
                      >
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
                        {authUser?.role === "ADMIN" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleDelete(problem.id)}
                              className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-semibold shadow-sm"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                            <button
                              disabled
                              className="px-3 py-1 rounded-lg bg-yellow-400 text-white text-sm font-semibold shadow-sm"
                            >
                              <PencilIcon className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                        <button
                          className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-100 flex gap-2 items-center bg-orange-500 text-sm font-semibold"
                          onClick={() => handleAddToPlaylist(problem.id)}
                        >
                          <Bookmark className="w-4 h-4" />
                          <span className="hidden sm:inline">Save</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">
                  No problems found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          className="px-3 py-1 rounded-lgbtn bg-[#239BA7] hover:bg-[#8C5A24] text-white shadow-md shadow-[#A66A2C]/40 rounded-lg transition-transform mt-6"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <span className="px-3 py-1 text-sm font-semibold text-gray-700">
          {currentPage} / {totalPages}
        </span>
        <button
          className="px-3 py-1 rounded-lgbtn bg-[#239BA7] hover:bg-[#8C5A24] text-white shadow-md shadow-[#A66A2C]/40 rounded-lg transition-transform mt-6"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>

      {/* Modals */}
      <CreatePlaylistModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePlaylist}
      />
      <AddToPlaylistModal
        isOpen={isAddToPlaylistModalOpen}
        onClose={() => setIsAddToPlaylistModalOpen(false)}
        problemId={selectedProblemId}
      />
    </div>
  );
};

export default ProblemsTable;
