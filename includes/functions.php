<?php
// include the file we just wrote - connect
include("connect.php"); // like a JS import statement

// link with myphpadmin database
$query = "SELECT * FROM tbl_favouriteThings";

$runQuery = $pdo->query($query);

$result = array();

while($row = $runQuery->fetch(PDO::FETCH_ASSOC)) {
    $result[] = $row;
}

// return $result;
echo(json_encode($result));