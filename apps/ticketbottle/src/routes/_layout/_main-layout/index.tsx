import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/_main-layout/')({
    component: Index,
})

function Index() {
    return <div>hasdsi</div>
}
