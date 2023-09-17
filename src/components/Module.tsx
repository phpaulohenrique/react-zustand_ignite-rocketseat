import { ChevronDown } from "lucide-react";
import { Lesson } from "./Lesson";
import * as Collapsible from '@radix-ui/react-collapsible'
import { useStore } from "../zustand-store";

interface ModuleProps{
    moduleIndex: number
    title: string
    amountOfLessons: number
}

export function Module({ moduleIndex, title, amountOfLessons}: ModuleProps){


    const { currentLessonIndex, currentModuleIndex, play, lessons } = useStore(store => {
        return{
            lessons: store.course?.modules[moduleIndex].lessons,
            currentLessonIndex: store.currentLessonIndex,
            currentModuleIndex: store.currentModuleIndex,
            play: store.play
        }
    })

    return(
        <Collapsible.Root className="group" defaultOpen={moduleIndex === 0}>
            <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-900 p-4">
                <div className="flex h-10 w-10 rounded-full items-center justify-center bg-blue-600/50 text-sm">
                    {moduleIndex + 1}
                </div>

                <div className="flex flex-col gap-1 text-left">
                    <strong className="text-sm">{title}</strong>
                    <span className="text-xs text-zinc-400">{amountOfLessons} aulas</span>

                </div>

                <ChevronDown className="w-5 h-5 ml-auto text-zinc-300 group-data-[state=open]:rotate-180 transition-transform duration-200"/>
            </Collapsible.Trigger>

            <Collapsible.Content>
                <nav className="relative flex flex-col gap-4 p-6">
                    {lessons && lessons.map((lesson, lessonIndex) => {
                        const isCurrent = currentModuleIndex === moduleIndex && currentLessonIndex === lessonIndex

                        return(
                            <Lesson key={lesson.id} title={lesson.title} duration={lesson.duration} isCurrent={isCurrent} onPlay={() => play([moduleIndex, lessonIndex])}/>
                        )
                    }
                    )}

                </nav>
            
            </Collapsible.Content>
            
        </Collapsible.Root>
    )
}