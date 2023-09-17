import { MessageCircle } from "lucide-react";
import { Header } from "../components/Header";
import { Video } from "../components/Video";
import { Module } from "../components/Module";
import { useEffect } from "react";
import { useCurrentLesson, useStore } from "../zustand-store";



export function Player(){
    const { course, load } = useStore()
    const { currentLesson} = useCurrentLesson()

    useEffect(() => {
        load()
    }, [])   

    useEffect(() => {
        if(currentLesson){
            document.title = `Assistindo: ${currentLesson?.title}`
        }
    }, [currentLesson])
    return(
        <div className="h-screen bg-zinc-900 text-zinc-50 flex justify-center items-center">
            <div className="flex w-[1100px] flex-col gap-6">
                <div className="flex items-center justify-between">
                    <Header/>

                    <button className="flex items-center gap-2 rounded bg-sky-600 px-3 py-2 text-sm font-medium text-white hover:bg-sky-700"> <MessageCircle className="w-4 h-4"/> Deixar Feedback</button>

                </div>

                <main className="relative flex overflow-hidden rounded-lg border border-zinc-700 bg-zinc-800 shadow pr-80">
                    <div className="flex-1">
                        <Video/>
                    </div>
                    <aside className="w-80 absolute divide-y-2 divide-blue-950/20 top-0 bottom-0 right-0 border-l border-blue-950/30 bg-zinc-800 overflow-y-scroll  scrollbar-thin scrollbar-track-slate-950 scrollbar-thumb-zinc-800">
                        {
                            course?.modules && course.modules?.map((module, index) => {

                                return(
                                    <Module key={module.id} moduleIndex={index} title={module.title} amountOfLessons={module.lessons.length} />
                                    
                                )
                            })
                        }
                    
                    </aside>

                </main>

            </div>

        </div>
    )
}