"""Shared fixtures and configuration for all tests"""
import pytest
import time
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait

BASE_URL = "http://localhost/mini_ecommerce/static"

@pytest.fixture
def driver():
    """Initialize Chrome WebDriver"""
    options = webdriver.ChromeOptions()
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    driver = webdriver.Chrome(options=options)
    driver.implicitly_wait(10)
    yield driver
    driver.quit()

@pytest.fixture
def wait(driver):
    """WebDriverWait helper"""
    return WebDriverWait(driver, 10)

@pytest.fixture
def unique_email():
    """Generate unique email for each test"""
    return f"testuser{int(time.time()*1000)}@example.com"

@pytest.fixture
def test_credentials(unique_email):
    """Reusable test credentials"""
    return {
        'email': unique_email,
        'password': 'TestPassword123',
        'username': f'user_{int(time.time())}'
    }