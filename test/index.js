const arr = [3, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function diagonalDifference(arr) {
  const row = arr[0];
  const matrix = [];
  for (let i = 0; i < row; i++) {
    matrix.push(arr.slice(1 + i * row, 1 + (i + 1) * row));
  }

  let primaryDiagonal = 0;
  let secondaryDiagonal = 0;

  for (let i = 0; i < matrix.length; i++) {
    primaryDiagonal += matrix[i][i];
    secondaryDiagonal += matrix[i][matrix.length - 1 - i];
  }

  return Math.abs(primaryDiagonal - secondaryDiagonal);
}

console.log(diagonalDifference(arr));
