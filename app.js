(function () {
  class CellElementRef {
    #element;
    #callback;

    constructor(element, callback) {
      this.#element = element;
      this.#callback = callback;
    }

    removeListener() {
      this.#element.removeEventListener("click", this.#callback);
    }
  }

  const container = document.getElementById("container");
  const tableElement = document.createElement("table");
  const playerX = "X";
  const playerO = "O";
  const totalCellCount = 9;
  const cellElementRefs = new Set();

  let cellData = [];
  let currentPlayer;

  tableElement.classList.add("app-table");

  container.appendChild(tableElement);

  document.getElementById("reset-btn").addEventListener("click", () => {
    while (tableElement.firstChild) {
      tableElement.removeChild(tableElement.firstChild);
    }

    currentPlayer = playerX;

    notifyMessage("");

    renderApp();
  });

  renderApp();

  function renderApp() {
    const cellPerRow = 3;

    currentPlayer = playerO;

    cellData = [...generateCellData()];

    for (let cellIndex = 0; cellIndex < totalCellCount; cellIndex++) {
      if (cellIndex % 3 === 0) {
        const tableRowElement = document.createElement("tr");

        tableElement.appendChild(tableRowElement);

        for (let rowCellIndex = 0; rowCellIndex < cellPerRow; rowCellIndex++) {
          createCellElement(tableRowElement, rowCellIndex, cellIndex);
        }
      }
    }
  }

  function createCellElement(tableRowElement, rowCellIndex, cellIndex) {
    const tableCellElement = document.createElement("td");
    const cellIndexKey = cellIndex + rowCellIndex;
    const onSelect = () => {
      // simulate switching of player
      notifyMessage(`${currentPlayer} turn.`);

      tableCellElement.removeEventListener("click", onSelect);

      currentPlayer = currentPlayer === playerX ? playerO : playerX;

      tableCellElement.innerHTML = currentPlayer;

      selectCell(cellIndexKey);
    };

    tableCellElement.innerHTML = `&nbsp;`;
    tableCellElement.addEventListener("click", onSelect);

    cellElementRefs.add(new CellElementRef(tableCellElement, onSelect));

    tableRowElement.appendChild(tableCellElement);
  }

  function selectCell(cellIndexKey) {
    const populatedCellDataIndexThreshold = 2;
    const cellDataCount = cellData.length;
    const selectedIndexKeySet = new Set();

    for (
      let cellDataIndex = 0;
      cellDataIndex < cellDataCount;
      cellDataIndex++
    ) {
      const cellDataMapper = cellData[cellDataIndex];

      // populated the selected cells
      cellDataMapper.forEach((currentValue, indexKey) => {
        if (currentValue === null && cellIndexKey === indexKey) {
          cellDataMapper.set(cellIndexKey, currentPlayer);
        }

        if (cellDataIndex <= populatedCellDataIndexThreshold) {
          const currentValue = cellDataMapper.get(indexKey);

          if (currentValue) {
            selectedIndexKeySet.add(indexKey);
          }
        }
      });

      // check for matched cells
      const cellDataValues = Array.from(cellDataMapper.values());
      const cellDataMatchFound = cellDataValues.every(
        (value) => value === currentPlayer
      );

      if (cellDataMatchFound) {
        notifyMessage(`Player ${currentPlayer} wins!`);

        removeCellListeners();

        break;
      }

      if (selectedIndexKeySet.size === totalCellCount) {
        notifyMessage("It's a draw!");
      }
    }

    console.log("cell data values", cellData);
  }

  function generateCellData() {
    return [
      // tracking for row 1
      new Map([
        [0, null],
        [1, null],
        [2, null],
      ]),
      // tracking for row 2
      new Map([
        [3, null],
        [4, null],
        [5, null],
      ]),
      // tracking for row 3
      new Map([
        [6, null],
        [7, null],
        [8, null],
      ]),
      // tracking for column 1
      new Map([
        [0, null],
        [3, null],
        [6, null],
      ]),
      // tracking for column 2
      new Map([
        [1, null],
        [4, null],
        [7, null],
      ]),
      // tracking for column 3
      new Map([
        [2, null],
        [5, null],
        [8, null],
      ]),
      // tracking for diagonal variation 1
      new Map([
        [0, null],
        [4, null],
        [8, null],
      ]),
      // tracking for diagonal variation 2
      new Map([
        [2, null],
        [4, null],
        [6, null],
      ]),
    ];
  }

  function notifyMessage(message) {
    const resultElement = document.getElementById("result");

    resultElement.innerHTML = message;
  }

  function removeCellListeners() {
    cellElementRefs.forEach((ref) => {
      ref.removeListener();
    });

    cellElementRefs.clear();
  }
})();
