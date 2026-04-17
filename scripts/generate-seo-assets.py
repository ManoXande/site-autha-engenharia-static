from PIL import Image, ImageDraw, ImageFont
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOGO_PATH = os.path.join(BASE_DIR, "public", "logo", "marca-branca-cortada.png")
OUT_DIR = os.path.join(BASE_DIR, "public")

# Cores do tema
BG_COLOR = (3, 7, 18)  # #030712
ACCENT_GREEN = (56, 217, 114)  # #38D972
TEXT_WHITE = (255, 255, 255)

def create_og_image():
    """OG Image 1200x630 para Open Graph / Twitter Card"""
    width, height = 1200, 630
    img = Image.new("RGB", (width, height), BG_COLOR)
    draw = ImageDraw.Draw(img)

    # Logo
    logo = Image.open(LOGO_PATH).convert("RGBA")
    # Scale logo to fit nicely (max width ~500px)
    logo_max_w = 500
    ratio = logo_max_w / logo.width
    logo_h = int(logo.height * ratio)
    logo = logo.resize((logo_max_w, logo_h), Image.LANCZOS)

    # Paste logo centered horizontally, slightly above center
    logo_x = (width - logo_max_w) // 2
    logo_y = 140
    img.paste(logo, (logo_x, logo_y), logo)

    # Slogan text
    slogan = "Engenharia de Precisão Guiada pela Sua Perspectiva"
    try:
        font = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 36)
    except:
        font = ImageFont.load_default()

    bbox = draw.textbbox((0, 0), slogan, font=font)
    text_w = bbox[2] - bbox[0]
    text_x = (width - text_w) // 2
    text_y = logo_y + logo_h + 50
    draw.text((text_x, text_y), slogan, fill=TEXT_WHITE, font=font)

    # Website URL at bottom
    url = "autha.eng.br"
    try:
        font_url = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 28)
    except:
        font_url = ImageFont.load_default()
    bbox_url = draw.textbbox((0, 0), url, font=font_url)
    url_w = bbox_url[2] - bbox_url[0]
    url_x = (width - url_w) // 2
    url_y = height - 80
    draw.text((url_x, url_y), url, fill=ACCENT_GREEN, font=font_url)

    out_path = os.path.join(OUT_DIR, "images", "og-image.jpg")
    img.save(out_path, "JPEG", quality=90)
    print(f"[OK] OG Image saved: {out_path}")


def create_favicon():
    """Favicon.ico multi-resolution: 16x16, 32x32, 48x48"""
    logo = Image.open(LOGO_PATH).convert("RGBA")
    sizes = [16, 32, 48]
    icons = []
    for size in sizes:
        icon = logo.resize((size, size), Image.LANCZOS)
        icons.append(icon)

    out_path = os.path.join(OUT_DIR, "favicon.ico")
    icons[0].save(out_path, format="ICO", sizes=[(s, s) for s in sizes])
    print(f"[OK] Favicon saved: {out_path}")


def create_apple_touch_icon():
    """Apple Touch Icon 180x180 com fundo escuro"""
    size = 180
    img = Image.new("RGB", (size, size), BG_COLOR)

    logo = Image.open(LOGO_PATH).convert("RGBA")
    # Logo fits within 140x140 centered
    logo_max = 140
    ratio = logo_max / max(logo.width, logo.height)
    logo_w = int(logo.width * ratio)
    logo_h = int(logo.height * ratio)
    logo = logo.resize((logo_w, logo_h), Image.LANCZOS)

    logo_x = (size - logo_w) // 2
    logo_y = (size - logo_h) // 2
    img.paste(logo, (logo_x, logo_y), logo)

    out_path = os.path.join(OUT_DIR, "apple-touch-icon.png")
    img.save(out_path, "PNG")
    print(f"[OK] Apple Touch Icon saved: {out_path}")


if __name__ == "__main__":
    os.makedirs(os.path.join(OUT_DIR, "images"), exist_ok=True)
    create_og_image()
    create_favicon()
    create_apple_touch_icon()
    print("\n[OK] Todos os assets SEO foram gerados!")
