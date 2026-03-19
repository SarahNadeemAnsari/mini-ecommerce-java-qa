<?php
session_start();

if (!empty($_SESSION['user_id'])) {
    $uid = $_SESSION['user_id'];
    try {
        $pdo = new PDO('mysql:host=127.0.0.1;dbname=mini_ecommerce;charset=utf8', 'root', '');
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        // Mark session as ended
        $stmt = $pdo->prepare('UPDATE user_sessions SET last_activity = NOW() WHERE user_id = :uid AND session_id = :sid LIMIT 1');
        $stmt->execute([':uid' => $uid, ':sid' => session_id()]);
    } catch(Exception $e) {
        error_log('Logout log error: ' . $e->getMessage());
    }
}

$_SESSION = [];
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params['path'], $params['domain'],
        $params['secure'], $params['httponly']
    );
}
session_destroy();
header('Content-Type: application/json; charset=utf-8');
echo json_encode(['ok'=>true]);
?>