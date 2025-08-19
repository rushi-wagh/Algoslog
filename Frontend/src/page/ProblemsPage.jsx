import { Loader } from "lucide-react";
import { useProblemStore } from "../store/useProblemStore";
import ProblemsTable from "../Components/ProblemTable";
import { useEffect } from "react";



const ProblemsPage = () => {
 
  const { problems, isProblemsLoading,getAllProblems } = useProblemStore();
  useEffect(() => {
    getAllProblems();
  },[]);
  console.log("Problems", problems);
// check if problem exists if not give one header with no problem found
    if (isProblemsLoading) {
        return (
            <div className="flex items-center mt-30 justify-center h-auto">
                <Loader className="size-20 animate-spin text-[#455945]" />
            </div>
        );
    }
    return (
        <div>
            
      {
        problems.length > 0 ? <ProblemsTable problems={problems} /> : (
            <p className="  text-center sm:mt-20 md:mt-30 z-10 h-auto  px-4 py-2 rounded-md text-gray-700 font-semibold text-3xl leading-tight ">
          No problems found
        </p>
        )
      }
        </div>
    )

}

export default ProblemsPage;