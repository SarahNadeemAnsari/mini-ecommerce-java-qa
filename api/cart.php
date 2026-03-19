<?php
session_start();
header('Content-Type: application/json; charset=utf-8');

try {
    $pdo = new PDO('mysql:host=127.0.0.1;dbname=mini_ecommerce;charset=utf8', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if (empty($_SESSION['user_id'])) {
        http_response_code(401);
        echo json_encode(['error'=>'not authenticated']);
        exit;
    }
    $uid = (int)$_SESSION['user_id'];

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $stmt = $pdo->prepare('SELECT cart_json FROM user_carts WHERE user_id = :uid LIMIT 1');
        $stmt->execute([':uid'=>$uid]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($row && $row['cart_json']) {
            $cart = json_decode($row['cart_json'], true);
            if (!is_array($cart)) $cart = [];
        } else {
            $cart = [];
        }
        
        echo json_encode(['cart'=>$cart]);
        exit;
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
        $cart = isset($input['cart']) ? $input['cart'] : (isset($input['items']) ? $input['items'] : null);
        
        if (!is_array($cart)) { 
            http_response_code(400); 
            echo json_encode(['error'=>'invalid cart']); 
            exit; 
        }

        $json = json_encode($cart);
        
        $stmt = $pdo->prepare('INSERT INTO user_carts (user_id, cart_json, updated_at) 
            VALUES (:uid, :json, NOW())
            ON DUPLICATE KEY UPDATE cart_json = VALUES(cart_json), updated_at = NOW()');
        $stmt->execute([':uid'=>$uid, ':json'=>$json]);
        
        echo json_encode(['ok'=>true]);
        exit;
    }

    http_response_code(405);
    echo json_encode(['error'=>'method not allowed']);
    exit;
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error'=>$e->getMessage()]);
    exit;
}
?>