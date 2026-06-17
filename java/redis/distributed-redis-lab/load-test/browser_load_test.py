import asyncio
import re
import time
from playwright.async_api import async_playwright, Browser

TARGET_URL = "https://especially-different-yeah-interval.trycloudflare.com"

USER_COUNT = 5
REPEAT_COUNT = 3
WAIT_BETWEEN_VISITS_MS = 500

def extract_value(label: str, text: str) -> str:
    pattern = rf"{re.escape(label)}\s*:?\s*([0-9A-Za-z가-힣_-]+)"
    match = re.search(pattern, text)
    if not match:
        return "N/A"
    return match.group(1).strip()

async def visit_page(browser: Browser, user_no: int) -> None:
    context = await browser.new_context()
    page = await context.new_page()

    for visit_no in range(1, REPEAT_COUNT + 1):
        started_at = time.perf_counter()

        try:
            response = await page.goto(
                TARGET_URL,
                wait_until="networkidle",
                timeout=30000
            )

            elapsed_ms = round((time.perf_counter() - started_at) * 1000, 2)
            body_text = await page.locator("body").inner_text()
            status = response.status if response else "N/A"

            front_server = extract_value("Front Server", body_text)
            local_count = extract_value("Local Count", body_text)
            db_count = extract_value("DB Count", body_text)
            redis_count = extract_value("Redis Count", body_text)

            print(f"[user={user_no}, visit={visit_no}] status={status}, elapsed={elapsed_ms}ms")
            print(f"Front Server:{front_server}")
            print(f"Local Count:{local_count}")
            print(f"DB Count:{db_count}")
            print(f"Redis Count:{redis_count}")
            print("-" * 70)

        except Exception as e:
            elapsed_ms = round((time.perf_counter() - started_at) * 1000, 2)
            print(f"[user={user_no}, visit={visit_no}] failed after {elapsed_ms}ms")
            print(f"error: {e}")
            print("-" * 70)

        await page.wait_for_timeout(WAIT_BETWEEN_VISITS_MS)

    await context.close()

async def main() -> None:
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            executable_path="/snap/bin/chromium",
            headless=True
        )

        tasks = [
            visit_page(browser, user_no)
            for user_no in range(1, USER_COUNT + 1)
        ]

        await asyncio.gather(*tasks)

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
