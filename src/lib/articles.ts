const modules = import.meta.glob('/static/v/*/data.js', { eager: true });

const articles = {} as Record<string, any>;

Object.entries(modules).forEach(([path, module]) => {
  const name = path.match(/^\/static\/v\/([^\/]+)\/data.js$/)?.[1] ?? '';
  const data = (module as { default: any })?.default
  if (data) {
    articles[name] = data;
  }
})

export default articles;