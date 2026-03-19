<?php
session_start();
header('Content-Type: application/json; charset=utf-8');
if (empty($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error'=>'not authenticated']);
    exit;
}
echo json_encode(['user'=>['id'=> (int)$_SESSION['user_id'], 'email'=> $_SESSION['user_email'] ?? null]]);
?>