<?php
session_start();
header('Content-Type: application/json; charset=utf-8');

$input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
$email = isset($input['email']) ? trim($input['email']) : '';
$pass  = isset($input['password']) ? $input['password'] : '';

if (!$email || !$pass) { 
    http_response_code(400); 
    echo json_encode(['error'=>'email/password required']); 
    exit; 
}

try {
    $pdo = new PDO('mysql:host=127.0.0.1;dbname=mini_ecommerce;charset=utf8', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare('SELECT id, username, email, password, role FROM users WHERE email = :email LIMIT 1');
    $stmt->execute([':email' => $email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$user) { 
        http_response_code(401); 
        echo json_encode(['error' => 'invalid credentials']); 
        exit; 
    }

    $ok = false;
    if (!empty($user['password'])) {
        if (password_verify($pass, $user['password'])) {
            $ok = true;
        } elseif ($pass === $user['password']) {
            $ok = true;
        }
    }

    if (!$ok) { 
        http_response_code(401); 
        echo json_encode(['error' => 'invalid credentials']); 
        exit; 
    }

    $_SESSION['user_id'] = (int)$user['id'];
    $_SESSION['user_email'] = $user['email'];
    $_SESSION['user_name'] = $user['username'] ?? $user['email'];

    // Log the login to database
    try {
        $logStmt = $pdo->prepare('INSERT INTO user_sessions (user_id, session_id, ip_address, user_agent) VALUES (:uid, :sid, :ip, :ua)');
        $logStmt->execute([
            ':uid' => (int)$user['id'],
            ':sid' => session_id(),
            ':ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
            ':ua' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown'
        ]);
    } catch(Exception $e) {
        error_log('Login log error: ' . $e->getMessage());
    }

    unset($user['password']);
    echo json_encode(['user' => $user, 'message' => 'Login successful']);
    exit;
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
    exit;
}

/*
// Run this SQL in your MySQL client to create the user_sessions table:
CREATE TABLE IF NOT EXISTS user_sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  session_id VARCHAR(255) UNIQUE,
  login_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  ip_address VARCHAR(45),
  user_agent TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
*/