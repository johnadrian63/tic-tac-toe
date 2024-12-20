(function () {
  class TicTactToe {
    #container = document.getElementById("container");
    #tableElement = document.createElement("table");

    #cellData = [
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

    #playerX = "X";
    #playerO = "O";

    #currentPlayer = this.#playerO;

    constructor() {
      this.#tableElement.classList.add("app-table");

      this.#container.appendChild(this.#tableElement);

      this.renderApp();

      document.getElementById("reset-btn").addEventListener("click", () => {
        while (this.#tableElement.firstChild) {
          this.#tableElement.removeChild(this.#tableElement.firstChild);
        }

        notifyWinner("");

        this.renderApp();
      });
    }

    renderApp() {
      const totalCellCount = 9;
      const cellPerRow = 3;

      for (let cellIndex = 0; cellIndex < totalCellCount; cellIndex++) {
        if (cellIndex % 3 === 0) {
          const tableRowElement = document.createElement("tr");

          this.tableElement.appendChild(tableRowElement);

          for (
            let rowCellIndex = 0;
            rowCellIndex < cellPerRow;
            rowCellIndex++
          ) {
            const tableCellElement = document.createElement("td");
            const cellIndexKey = cellIndex + rowCellIndex;

            tableCellElement.innerHTML = "&nbsp;";

            const onSelect = () => {
              // simulate switching of player
              this.#currentPlayer =
                this.#currentPlayer === this.#playerX
                  ? this.#playerO
                  : this.#playerX;

              tableCellElement.innerHTML = currentPlayer;
              tableCellElement.removeEventListener("click", onSelect);

              selectCell(cellIndexKey);
            };

            tableCellElement.addEventListener("click", onSelect);

            tableRowElement.appendChild(tableCellElement);
          }
        }
      }
    }

    #selectCell(cellIndexKey) {
      for (
        let cellDataIndex = 0;
        cellDataIndex < this.#cellData.length;
        cellDataIndex++
      ) {
        const cellDataMapper = this.#cellData[cellDataIndex];

        cellDataMapper.forEach((currentValue, indexKey) => {
          if (currentValue === null && cellIndexKey === indexKey) {
            cellDataMapper.set(cellIndexKey, this.#currentPlayer);
          }
        });

        const cellDataValues = Array.from(cellDataMapper.values());
        const cellDataMatched = cellDataValues.every(
          (value) => value === this.#currentPlayer
        );

        if (cellDataMatched) {
          this.notifyWinner(`${this.#currentPlayer} win!`);

          break;
        }
      }

      console.log("cell data values", cellData);
    }

    notifyWinner(message) {
      const resultElement = document.getElementById("result");

      resultElement.innerHTML = message;
    }
  }

  new TicTactToe();
})();
