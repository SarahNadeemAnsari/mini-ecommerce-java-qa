<?php
header('Content-Type: application/json; charset=utf-8');

$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 0;
$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

try {
    $pdo = new PDO('mysql:host=127.0.0.1;dbname=mini_ecommerce;charset=utf8', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($id > 0) {
        $sql = 'SELECT * FROM products WHERE id = :id LIMIT 1';
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } else {
        $sql = 'SELECT * FROM products';
        if ($limit > 0) $sql .= ' LIMIT :limit';
        $stmt = $pdo->prepare($sql);
        if ($limit > 0) $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Normalize image field names to "image" and "image_url"
    foreach ($rows as &$r) {
        if (!isset($r['image']) || !$r['image']) {
            if (isset($r['image_url']) && $r['image_url']) $r['image'] = $r['image_url'];
            elseif (isset($r['image_path'])) $r['image'] = $r['image_path'];
            elseif (isset($r['img'])) $r['image'] = $r['img'];
            else $r['image'] = null;
        }
        if (!isset($r['image_url']) || !$r['image_url']) {
            $r['image_url'] = $r['image'];
        }
    }
    // If single id requested, return single object
    if ($id > 0) {
        echo json_encode(isset($rows[0]) ? $rows[0] : null);
    } else {
        echo json_encode($rows);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
