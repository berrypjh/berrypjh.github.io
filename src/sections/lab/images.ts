import type { Project } from './projects'

/** Screenshots in ./assets, picked up by file name: assets/<project id>.png|jpg|jpeg|webp|gif. */
const FILES = import.meta.glob<string>('./assets/*.{png,jpg,jpeg,webp,gif}', { eager: true, import: 'default' })

const BY_ID = new Map(
  Object.entries(FILES).map(([path, url]) => [path.slice('./assets/'.length).replace(/\.\w+$/, ''), url]),
)

/** A public project's screenshot, if one has been added. Company work never shows one. */
export const imageOf = (project: Project) =>
  project.visibility === 'public' ? BY_ID.get(project.id) : undefined
