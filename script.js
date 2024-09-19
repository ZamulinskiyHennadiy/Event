const textContainer = document.getElementById('text-container');
const textEditor = document.getElementById('text-editor');
let editing = false;

document.addEventListener('keydown', function (e) {
  // Ctrl + E: Включення режиму редагування
  if (e.ctrlKey && e.key === 'e') {
    e.preventDefault();  // Вимикаємо поведінку за замовчуванням для Ctrl + E
    if (!editing) {
      textEditor.value = textContainer.textContent;
      textContainer.style.display = 'none';
      textEditor.style.display = 'block';
      textEditor.focus();
      editing = true;
    }
  }

  // Ctrl + S: Збереження зміненого тексту
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault();  // Вимикаємо поведінку за замовчуванням для Ctrl + S
    if (editing) {
      textContainer.textContent = textEditor.value;
      textEditor.style.display = 'none';
      textContainer.style.display = 'block';
      editing = false;
    }
  }
});

//HTML-сторінка з таблицею, що сортується по заголовках стовпців
document.querySelectorAll('#sortable-table th').forEach((header, index) => {
  header.addEventListener('click', () => {
    const tableBody = document.querySelector('#sortable-table tbody');
    const rows = Array.from(tableBody.querySelectorAll('tr'));
    const isNumeric = !isNaN(rows[0].cells[index].textContent);

    rows.sort((rowA, rowB) => {
      const cellA = rowA.cells[index].textContent;
      const cellB = rowB.cells[index].textContent;

      if (isNumeric) {
        return Number(cellA) - Number(cellB);
      } else {
        return cellA.localeCompare(cellB);
      }
    });

    rows.forEach(row => tableBody.appendChild(row)); // Переміщення відсортованих рядків
  });
});

//HTML-сторінка з можливістю зміни розміру блоку
const resizeBlock = document.getElementById('resize-block');
const resizeHandle = document.getElementById('resize-handle');

resizeHandle.addEventListener('mousedown', function (e) {
  e.preventDefault();

  window.addEventListener('mousemove', resize);
  window.addEventListener('mouseup', stopResize);
});

function resize(e) {
  resizeBlock.style.width = (e.clientX - resizeBlock.getBoundingClientRect().left) + 'px';
  resizeBlock.style.height = (e.clientY - resizeBlock.getBoundingClientRect().top) + 'px';
}

function stopResize() {
  window.removeEventListener('mousemove', resize);
  window.removeEventListener('mouseup', stopResize);
}