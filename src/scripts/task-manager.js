const storageKey = 'bitacora-sdlc-taskflow-v1';
const initialTasks = [
  { id: 'demo-1', title: 'Definir alcance del MVP', detail: 'Acordar qué entra en esta primera versión', priority: 'alta', done: false },
  { id: 'demo-2', title: 'Modelar tareas y estados', detail: '', priority: 'media', done: true },
  { id: 'demo-3', title: 'Probar filtros de prioridad', detail: '', priority: 'baja', done: false }
];

const form = document.querySelector('#task-form');
if (form) {
  const list = document.querySelector('#task-list');
  const title = document.querySelector('#task-title');
  const detail = document.querySelector('#task-detail');
  const priority = document.querySelector('#task-priority');
  const statusFilter = document.querySelector('#filter-status');
  const priorityFilter = document.querySelector('#filter-priority');
  const count = document.querySelector('#task-count');
  const empty = document.querySelector('#empty-state');
  const message = document.querySelector('#storage-message');
  let storageAvailable = true;

  function readTasks() {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved === null) return [...initialTasks];
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) throw new Error('Formato inválido');
      return parsed.filter(task => task && typeof task.id === 'string' && typeof task.title === 'string');
    } catch {
      storageAvailable = false;
      message.textContent = 'No se pudieron leer los datos guardados. Los cambios vivirán solo hasta cerrar esta página.';
      return [...initialTasks];
    }
  }
  let tasks = readTasks();

  function save() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(tasks));
      message.textContent = '';
      storageAvailable = true;
    } catch {
      storageAvailable = false;
      message.textContent = 'El almacenamiento local no está disponible. Los cambios no sobrevivirán al cierre de esta página.';
    }
  }

  function render() {
    const visible = tasks.filter(task =>
      (statusFilter.value === 'todas' || (statusFilter.value === 'hecha') === task.done) &&
      (priorityFilter.value === 'todas' || task.priority === priorityFilter.value)
    );
    list.replaceChildren(...visible.map(task => {
      const item = document.createElement('li');
      item.className = 'interactive-task' + (task.done ? ' is-done' : '');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.done;
      checkbox.setAttribute('aria-label', (task.done ? 'Reabrir ' : 'Completar ') + task.title);
      checkbox.addEventListener('change', () => {
        task.done = checkbox.checked;
        save();
        render();
      });
      const copy = document.createElement('div');
      copy.className = 'task-copy';
      const name = document.createElement('strong');
      name.textContent = task.title;
      copy.append(name);
      if (task.detail) {
        const description = document.createElement('span');
        description.textContent = task.detail;
        copy.append(description);
      }
      const badge = document.createElement('span');
      badge.className = 'priority ' + task.priority;
      badge.textContent = task.priority;
      const edit = document.createElement('button');
      edit.type = 'button';
      edit.className = 'small-action';
      edit.textContent = 'Editar';
      edit.setAttribute('aria-label', 'Editar ' + task.title);
      edit.addEventListener('click', () => {
        const updated = window.prompt('Editar título de la tarea', task.title);
        if (updated?.trim()) {
          task.title = updated.trim().slice(0, 120);
          save();
          render();
        }
      });
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'small-action delete-action';
      remove.textContent = 'Eliminar';
      remove.setAttribute('aria-label', 'Eliminar ' + task.title);
      remove.addEventListener('click', () => {
        tasks = tasks.filter(candidate => candidate.id !== task.id);
        save();
        render();
      });
      item.append(checkbox, copy, badge, edit, remove);
      return item;
    }));
    const activeCount = tasks.filter(task => !task.done).length;
    count.textContent = activeCount + " pendiente" + (activeCount === 1 ? "" : "s") + " de " + tasks.length;
    empty.hidden = visible.length > 0;
    if (tasks.length === 0) empty.textContent = 'Tu lista está vacía. Añade tu primera tarea.';
    else empty.textContent = 'No hay tareas con estos filtros. Puedes añadir una o cambiar el filtro.';
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    const name = title.value.trim();
    if (!name) return;
    tasks.unshift({ id: globalThis.crypto?.randomUUID?.() ?? String(Date.now()), title: name, detail: detail.value.trim(), priority: priority.value, done: false });
    save();
    form.reset();
    render();
    title.focus();
  });
  statusFilter.addEventListener('change', render);
  priorityFilter.addEventListener('change', render);
  document.querySelector('#clear-demo').addEventListener('click', () => {
    tasks = [...initialTasks];
    statusFilter.value = 'todas';
    priorityFilter.value = 'todas';
    save();
    render();
  });
  if (!storageAvailable) message.dataset.storageUnavailable = 'true';
  render();
}
