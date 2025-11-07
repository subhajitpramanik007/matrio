import { TCheckersCellPosition } from "../../types";
import { CheckersCell } from "./checkers.cell";

export class CheckersBoard {
  private _grid: CheckersCell[][];

  constructor(private boardSize: number) {
    this._grid = this.freshBoard();
  }

  get grid() {
    return this._grid;
  }

  getCell(row: number, col: number): CheckersCell | null {
    if (!this.validatedPosition([row, col])) return null;
    return this._grid[row][col];
  }

  getCellByPosition(position: TCheckersCellPosition): CheckersCell | null {
    const [row, col] = position;
    if (!this.validatedPosition(position)) return null;
    return this.getCell(row, col);
  }

  init() {
    this._grid = this.freshBoard();
    this.initializePieces();
  }

  getValidMoves(cell: CheckersCell): {
    normalMoves: TCheckersCellPosition[];
    captures: {
      landing: TCheckersCellPosition;
      captured: TCheckersCellPosition;
    }[];
  } {
    const piece = cell.piece;
    if (!piece) return { normalMoves: [], captures: [] };

    const directions = piece.getMoveDirections();
    const normalMoves: TCheckersCellPosition[] = [];
    const captures: {
      landing: TCheckersCellPosition;
      captured: TCheckersCellPosition;
    }[] = [];

    for (const direction of directions) {
      const [dirRow, dirCol] = direction;
      const mid = this.getCell(cell.row + dirRow, cell.col + dirCol);
      const landing = this.getCell(
        cell.row + dirRow * 2,
        cell.col + dirCol * 2
      );

      // if normal move
      if (mid && !mid.isPiecePresent() && Math.abs(dirRow) === 1) {
        normalMoves.push([mid.row, mid.col]);
      }

      // if capture move
      if (
        mid &&
        landing &&
        landing.isPiecePresent() &&
        landing.piece?.color !== piece.color &&
        landing.piece === null
      ) {
        captures.push({
          landing: [landing.row, landing.col],
          captured: [mid.row, mid.col],
        });
      }
    }

    return { normalMoves, captures };
  }

  getMultipleCapture(
    cell: CheckersCell,
    visited: Set<string> = new Set()
  ): TCheckersCellPosition[][] {
    const { captures } = this.getValidMoves(cell);
    if (captures.length === 0) return [[cell.position]];

    const allSequences: TCheckersCellPosition[][] = [];

    for (const { landing, captured } of captures) {
      const capturedKey = `${captured[0]}-${captured[1]}`;
      if (visited.has(capturedKey)) continue;

      const newVisited = new Set(visited);
      newVisited.add(capturedKey);

      const newBoard = this.clone();
      const fromCell = newBoard.getCell(cell.row, cell.col)!;
      const landingCell = newBoard.getCell(landing[0], landing[1])!;
      const capturedCell = newBoard.getCell(captured[0], captured[1])!;

      landingCell.changePiece(fromCell.piece!);
      fromCell.removePiece();
      capturedCell.removePiece();

      const nextSequences = newBoard.getMultipleCapture(
        landingCell,
        newVisited
      );
      for (const seq of nextSequences) {
        allSequences.push([cell.position, ...seq]);
      }
    }

    return allSequences;
  }

  //   deep clone
  private clone(): CheckersBoard {
    const newBoard = new CheckersBoard(this.boardSize);
    newBoard._grid = this._grid.map((row) => [...row]);
    return JSON.parse(JSON.stringify(newBoard));
  }

  private freshBoard(): CheckersCell[][] {
    return Array.from({ length: this.boardSize }, (_, row) =>
      Array.from(
        { length: this.boardSize },
        (_, col) => new CheckersCell(row, col)
      )
    );
  }

  private initializePieces() {
    for (let row = 0; row < this.boardSize; row++) {
      for (let col = 0; col < this.boardSize; col++) {
        if ((row + col) % 2 === 0) continue;

        if (row < 3) {
          this._grid[row][col].initPiece("black");
        } else if (row >= this.boardSize - 3) {
          this._grid[row][col].initPiece("red");
        }
      }
    }
  }

  private validatedPosition([row, col]: TCheckersCellPosition) {
    const isValidRow = row >= 0 && row < this.boardSize;
    const isValidCol = col >= 0 && col < this.boardSize;
    if (!isValidRow || !isValidCol) return false;
    return true;
  }
}
