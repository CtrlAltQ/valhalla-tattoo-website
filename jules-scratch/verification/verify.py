import asyncio
from playwright.async_api import async_playwright, expect
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # 1. Navigate to index.html and take a screenshot
        await page.goto(f"file://{os.getcwd()}/index.html")
        await page.screenshot(path="jules-scratch/verification/01_main_page.png")

        # 2. Test the booking form
        # Scroll to the booking form
        await page.locator("#book").scroll_into_view_if_needed()

        # Fill out the form
        await page.locator("#name").fill("Test User")
        await page.locator("#email").fill("test@example.com")
        await page.locator("#message").fill("This is a test message.")

        # Click the submit button
        await page.locator(".btn-booking").click()

        # Wait for the success message to be visible
        success_message = page.locator(".booking-success-message")
        await expect(success_message).to_be_visible()

        # Take a screenshot of the success message
        await page.screenshot(path="jules-scratch/verification/02_booking_success.png")


        # 3. Navigate to a portfolio page and take a screenshot
        await page.goto(f"file://{os.getcwd()}/portfolio/pagan.html")

        # Wait for the portfolio page to load
        await page.wait_for_load_state("domcontentloaded")

        # Take a screenshot of the portfolio page
        await page.screenshot(path="jules-scratch/verification/03_portfolio_page.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
