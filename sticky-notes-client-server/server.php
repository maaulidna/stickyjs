<?php
$file = 'notes.json';

if (!file_exists($file)) {
    file_put_contents($file, json_encode([]));
}

$notes = json_decode(file_get_contents($file), true);

// tambah note baru
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if ($input && isset($input['text'])) {
        $notes[] = $input;
        file_put_contents($file, json_encode($notes));
    }
    exit;
}

// hapus note
if (isset($_GET['delete'])) {
    $index = (int) $_GET['delete'];
    array_splice($notes, $index, 1);
    file_put_contents($file, json_encode($notes));
    exit;
}

// update teks note
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $input = json_decode(file_get_contents('php://input'), true);
    $index = $input['index'] ?? null;
    if ($index !== null && isset($notes[$index])) {
        $notes[$index]['text'] = $input['text'];
        file_put_contents($file, json_encode($notes));
    }
    exit;
}

// simpan posisi note
if ($_SERVER['REQUEST_METHOD'] === 'PATCH') {
    $input = json_decode(file_get_contents('php://input'), true);
    $index = $input['index'] ?? null;
    if ($index !== null && isset($notes[$index])) {
        $notes[$index]['top'] = $input['top'];
        $notes[$index]['left'] = $input['left'];
        file_put_contents($file, json_encode($notes));
    }
    exit;
}

header('Content-Type: application/json');
echo json_encode($notes);
?>
