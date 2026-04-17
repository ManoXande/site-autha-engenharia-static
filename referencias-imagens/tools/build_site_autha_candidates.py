from __future__ import annotations

import io
import math
from pathlib import Path

from PIL import Image, ImageChops, ImageColor, ImageDraw, ImageEnhance, ImageFilter, ImageOps


ROOT = Path("/Users/manoxande/Desktop/referencias-imagens")
OUT_ROOT = ROOT / "site-autha-candidatas" / "public" / "images"
SECTIONS_DIR = OUT_ROOT / "sections"
CANVAS = (2560, 1440)


def ensure_dirs() -> None:
    SECTIONS_DIR.mkdir(parents=True, exist_ok=True)


def open_image(name: str) -> Image.Image:
    return Image.open(ROOT / name).convert("RGBA")


def cover(img: Image.Image, size: tuple[int, int], focus: tuple[float, float] = (0.5, 0.5)) -> Image.Image:
    src_w, src_h = img.size
    dst_w, dst_h = size
    src_ratio = src_w / src_h
    dst_ratio = dst_w / dst_h

    if src_ratio > dst_ratio:
        new_h = dst_h
        new_w = int(src_w * (dst_h / src_h))
    else:
        new_w = dst_w
        new_h = int(src_h * (dst_w / src_w))

    resized = img.resize((new_w, new_h), Image.Resampling.LANCZOS)

    max_x = max(new_w - dst_w, 0)
    max_y = max(new_h - dst_h, 0)
    left = int(max_x * focus[0])
    top = int(max_y * focus[1])
    left = max(0, min(left, max_x))
    top = max(0, min(top, max_y))
    return resized.crop((left, top, left + dst_w, top + dst_h))


def crop_box(img: Image.Image, box: tuple[int, int, int, int]) -> Image.Image:
    return img.crop(box)


def remove_white(img: Image.Image, threshold: int = 242, soften: int = 2) -> Image.Image:
    rgba = img.convert("RGBA")
    w, h = rgba.size
    px = rgba.load()
    mask = Image.new("L", (w, h), 0)
    mask_px = mask.load()
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                mask_px[x, y] = 0
                continue
            avg = (r + g + b) // 3
            if avg < threshold:
                value = 255
            else:
                value = max(0, int((255 - avg) * 8))
            mask_px[x, y] = value
    if soften:
        mask = mask.filter(ImageFilter.GaussianBlur(soften))
    rgba.putalpha(mask)
    return rgba


def tint(img: Image.Image, color: str = "#6EE7B7", amount: float = 0.2) -> Image.Image:
    base = img.convert("RGBA")
    overlay = Image.new("RGBA", base.size, ImageColor.getrgb(color) + (0,))
    alpha = int(255 * amount)
    overlay.putalpha(alpha)
    return Image.alpha_composite(base, overlay)


def grade(
    img: Image.Image,
    saturation: float = 0.82,
    contrast: float = 1.12,
    brightness: float = 0.92,
    sharpness: float = 1.05,
    black_overlay: float = 0.18,
) -> Image.Image:
    rgba = img.convert("RGBA")
    alpha = rgba.getchannel("A")
    base = rgba.convert("RGB")
    base = ImageEnhance.Color(base).enhance(saturation)
    base = ImageEnhance.Contrast(base).enhance(contrast)
    base = ImageEnhance.Brightness(base).enhance(brightness)
    base = ImageEnhance.Sharpness(base).enhance(sharpness)
    out = base.convert("RGBA")
    out.putalpha(alpha)
    if black_overlay > 0:
        dark = Image.new("RGBA", out.size, (3, 7, 18, int(255 * black_overlay)))
        out = Image.alpha_composite(out, dark)
        out.putalpha(alpha)
    return out


def soft_light_blend(a: Image.Image, b: Image.Image, opacity: float = 1.0) -> Image.Image:
    base = a.convert("RGBA")
    top = b.convert("RGBA")
    blended_rgb = ImageChops.soft_light(base.convert("RGB"), top.convert("RGB"))
    blended = blended_rgb.convert("RGBA")
    if opacity < 1:
        alpha = blended.getchannel("A").point(lambda p: int(p * opacity))
        blended.putalpha(alpha)
    return Image.alpha_composite(base, blended)


def screen_blend(a: Image.Image, b: Image.Image, opacity: float = 1.0) -> Image.Image:
    base = a.convert("RGBA")
    top = b.convert("RGBA")
    blended_rgb = ImageChops.screen(base.convert("RGB"), top.convert("RGB"))
    blended = blended_rgb.convert("RGBA")
    if opacity < 1:
        alpha = Image.new("L", blended.size, int(255 * opacity))
        blended.putalpha(alpha)
    return Image.alpha_composite(base, blended)


def add_vignette(img: Image.Image, strength: float = 0.48) -> Image.Image:
    base = img.convert("RGBA")
    w, h = base.size
    mask = Image.new("L", (w, h), 0)
    draw = ImageDraw.Draw(mask)
    margin = int(min(w, h) * 0.1)
    draw.ellipse((margin, margin, w - margin, h - margin), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(int(min(w, h) * 0.16)))
    inv = ImageOps.invert(mask).point(lambda p: int(p * strength))
    overlay = Image.new("RGBA", (w, h), (3, 7, 18, 0))
    overlay.putalpha(inv)
    return Image.alpha_composite(base, overlay)


def add_linear_overlay(
    img: Image.Image,
    color: tuple[int, int, int] = (3, 7, 18),
    start_alpha: int = 190,
    end_alpha: int = 20,
    horizontal: bool = True,
    reverse: bool = False,
) -> Image.Image:
    base = img.convert("RGBA")
    w, h = base.size
    grad = Image.new("L", (w, h))
    px = grad.load()
    for y in range(h):
        for x in range(w):
            pos = x / max(1, w - 1) if horizontal else y / max(1, h - 1)
            if reverse:
                pos = 1 - pos
            alpha = int(start_alpha + (end_alpha - start_alpha) * pos)
            px[x, y] = alpha
    overlay = Image.new("RGBA", (w, h), color + (0,))
    overlay.putalpha(grad)
    return Image.alpha_composite(base, overlay)


def add_radial_glow(
    img: Image.Image,
    center: tuple[float, float] = (0.7, 0.35),
    radius: float = 0.35,
    color: tuple[int, int, int] = (74, 222, 128),
    intensity: float = 0.16,
) -> Image.Image:
    base = img.convert("RGBA")
    w, h = base.size
    cx = int(center[0] * w)
    cy = int(center[1] * h)
    max_r = int(min(w, h) * radius)
    glow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(glow)
    for i in range(max_r, 0, -12):
        alpha = int(255 * intensity * (i / max_r) ** 1.8)
        draw.ellipse((cx - i, cy - i, cx + i, cy + i), fill=color + (alpha,))
    glow = glow.filter(ImageFilter.GaussianBlur(40))
    return Image.alpha_composite(base, glow)


def add_shadow(img: Image.Image, blur: int = 28, offset: tuple[int, int] = (0, 12), alpha: int = 120) -> Image.Image:
    w, h = img.size
    shadow = Image.new("RGBA", (w + blur * 4, h + blur * 4), (0, 0, 0, 0))
    mask = img.getchannel("A")
    shadow_mask = Image.new("L", shadow.size, 0)
    shadow_mask.paste(mask, (blur * 2 + offset[0], blur * 2 + offset[1]))
    shadow_mask = shadow_mask.filter(ImageFilter.GaussianBlur(blur))
    shadow.putalpha(shadow_mask.point(lambda p: min(255, int(p * alpha / 255))))
    result = Image.new("RGBA", shadow.size, (0, 0, 0, 0))
    result = Image.alpha_composite(result, shadow)
    result.alpha_composite(img, (blur * 2, blur * 2))
    return result


def place(
    canvas: Image.Image,
    img: Image.Image,
    box: tuple[int, int, int, int],
    opacity: float = 1.0,
    rotation: float = 0.0,
    cover_mode: bool = False,
) -> Image.Image:
    x, y, w, h = box
    piece = cover(img, (w, h)) if cover_mode else img.resize((w, h), Image.Resampling.LANCZOS)
    if rotation:
        piece = piece.rotate(rotation, expand=True, resample=Image.Resampling.BICUBIC)
    if opacity < 1:
        alpha = piece.getchannel("A").point(lambda p: int(p * opacity))
        piece.putalpha(alpha)
    canvas.alpha_composite(piece, (x, y))
    return canvas


def add_grain(img: Image.Image, amount: int = 14) -> Image.Image:
    base = img.convert("RGBA")
    w, h = base.size
    noise = Image.effect_noise((w, h), amount).convert("L")
    noise = ImageOps.autocontrast(noise)
    noise_rgba = Image.new("RGBA", (w, h), (255, 255, 255, 0))
    noise_rgba.putalpha(noise.point(lambda p: int(p * 0.06)))
    return Image.alpha_composite(base, noise_rgba)


def save(img: Image.Image, name: str) -> None:
    out = (SECTIONS_DIR if name != "og-image.jpg" else OUT_ROOT) / name
    out.parent.mkdir(parents=True, exist_ok=True)
    rgb = img.convert("RGB")
    quality = 86
    best = None
    while quality >= 64:
        buf = io.BytesIO()
        rgb.save(buf, format="JPEG", quality=quality, optimize=True, progressive=True)
        data = buf.getvalue()
        best = data
        if len(data) <= 450 * 1024 or quality == 64:
            out.write_bytes(data)
            return
        quality -= 4

    if best is not None:
        out.write_bytes(best)


def build_hero() -> Image.Image:
    src = open_image("base_cartografica_municipio_marema_autha.jpg")
    municipality = crop_box(src, (550, 120, 7850, 6950))
    municipality = remove_white(municipality, threshold=236, soften=3)
    municipality = grade(municipality, saturation=0.84, contrast=1.08, brightness=0.98, black_overlay=0.06)
    municipality = municipality.resize((1740, 1460), Image.Resampling.LANCZOS)

    bg = cover(src, CANVAS, focus=(0.56, 0.32))
    bg = bg.filter(ImageFilter.GaussianBlur(20))
    bg = grade(bg, saturation=0.72, contrast=1.12, brightness=0.72, black_overlay=0.22)
    bg = add_linear_overlay(bg, start_alpha=210, end_alpha=60, horizontal=True, reverse=False)
    bg = add_radial_glow(bg, center=(0.72, 0.45), radius=0.32, intensity=0.13)

    canvas = bg.convert("RGBA")
    muni_with_shadow = add_shadow(municipality, blur=34, offset=(10, 20), alpha=150)
    canvas.alpha_composite(muni_with_shadow, (1110, -20))
    canvas = add_vignette(canvas, strength=0.42)
    canvas = add_grain(canvas, amount=9)
    return canvas


def build_manifesto() -> Image.Image:
    bg = Image.new("RGBA", CANVAS, ImageColor.getrgb("#030712") + (255,))
    bg = add_radial_glow(bg, center=(0.36, 0.5), radius=0.44, color=(110, 231, 183), intensity=0.07)
    bg = add_radial_glow(bg, center=(0.72, 0.32), radius=0.26, color=(74, 222, 128), intensity=0.05)

    political = open_image("mapa_mundi_politico_authagraph.webp")
    political = cover(political, (1560, 780), focus=(0.5, 0.45))
    political = grade(political, saturation=0.38, contrast=1.08, brightness=0.74, black_overlay=0.0)
    political.putalpha(Image.new("L", political.size, 132))

    map_flat = remove_white(open_image("planificacao_triangular_authagraph.png"), threshold=244, soften=2)
    map_flat = grade(map_flat, saturation=0.5, contrast=1.16, brightness=0.82, black_overlay=0.0)
    map_flat = map_flat.resize((760, 362), Image.Resampling.LANCZOS)
    map_flat.putalpha(map_flat.getchannel("A").point(lambda p: int(p * 0.8)))

    globe = remove_white(open_image("globo_desmontagem_authagraph.webp"), threshold=245, soften=2)
    globe = grade(globe, saturation=0.72, contrast=1.12, brightness=0.84, black_overlay=0.0)
    globe = globe.resize((900, 600), Image.Resampling.LANCZOS)

    topo = Image.new("RGBA", CANVAS, (0, 0, 0, 0))
    draw = ImageDraw.Draw(topo)
    for i in range(26):
        inset = 40 + i * 42
        alpha = max(8, 28 - i)
        draw.rounded_rectangle((inset, inset * 0.65, CANVAS[0] - inset, CANVAS[1] - inset * 0.65), radius=220, outline=(112, 128, 144, alpha), width=1)
    topo = topo.filter(ImageFilter.GaussianBlur(0.6))

    canvas = bg.copy()
    canvas.alpha_composite(political, (70, 260))
    canvas.alpha_composite(add_shadow(map_flat, blur=20, offset=(0, 10), alpha=90), (260, 120))
    canvas.alpha_composite(add_shadow(globe, blur=32, offset=(0, 24), alpha=130), (1530, 600))
    canvas = screen_blend(canvas, topo, opacity=0.75)

    tri_draw = ImageDraw.Draw(canvas)
    points = [(980, 220), (1700, 270), (2060, 590), (1645, 990), (970, 930), (650, 520)]
    for idx in range(len(points)):
        p1 = points[idx]
        p2 = points[(idx + 1) % len(points)]
        tri_draw.line((p1, p2), fill=(110, 231, 183, 85), width=2)
    tri_draw.line((points[0], points[3]), fill=(110, 231, 183, 65), width=1)
    tri_draw.line((points[1], points[4]), fill=(110, 231, 183, 65), width=1)
    tri_draw.line((points[2], points[5]), fill=(110, 231, 183, 65), width=1)

    canvas = add_vignette(canvas, strength=0.38)
    canvas = add_grain(canvas, amount=8)
    return canvas


def build_mapeamento() -> Image.Image:
    ortho = open_image("levantamento_planimetrico_reconstituicao_loteamento.png")
    ortho = crop_box(ortho, (120, 60, 4100, 4020))
    bg = cover(ortho, CANVAS, focus=(0.42, 0.46))
    bg = grade(bg, saturation=0.72, contrast=1.14, brightness=0.78, black_overlay=0.12)
    bg = add_linear_overlay(bg, start_alpha=150, end_alpha=70, horizontal=True, reverse=True)

    historical = remove_white(open_image("mapa_colonial_lotes_originais.jpg"), threshold=240, soften=2)
    historical = grade(historical, saturation=0.55, contrast=1.08, brightness=0.95, black_overlay=0.0)
    historical = ImageOps.expand(historical, border=18, fill=(214, 196, 160, 255))
    historical = add_shadow(historical, blur=26, offset=(0, 18), alpha=120)

    original_photo = open_image("foto_mapa_original_loteamento.jpg")
    original_photo = cover(original_photo, (760, 920), focus=(0.58, 0.38))
    original_photo = grade(original_photo, saturation=0.7, contrast=1.16, brightness=0.88, black_overlay=0.06)
    original_photo = ImageOps.expand(original_photo, border=12, fill=(32, 25, 18))
    original_photo = add_shadow(original_photo, blur=24, offset=(0, 16), alpha=110)

    canvas = bg.convert("RGBA")
    canvas.alpha_composite(historical.resize((1180, 1020), Image.Resampling.LANCZOS).rotate(-7, expand=True, resample=Image.Resampling.BICUBIC), (1030, 140))
    canvas.alpha_composite(original_photo.rotate(6, expand=True, resample=Image.Resampling.BICUBIC), (1460, 690))

    grid = Image.new("RGBA", CANVAS, (0, 0, 0, 0))
    g = ImageDraw.Draw(grid)
    for x in range(0, CANVAS[0], 140):
        g.line((x, 0, x, CANVAS[1]), fill=(148, 163, 184, 20), width=1)
    for y in range(0, CANVAS[1], 140):
        g.line((0, y, CANVAS[0], y), fill=(148, 163, 184, 20), width=1)
    canvas = screen_blend(canvas, grid, opacity=0.45)

    label = Image.new("RGBA", CANVAS, (0, 0, 0, 0))
    draw = ImageDraw.Draw(label)
    draw.rectangle((95, 1180, 640, 1332), fill=(3, 7, 18, 170))
    draw.line((124, 1214, 124, 1300), fill=(74, 222, 128, 190), width=3)
    for i, text in enumerate(("KANTU / SPIRONELLO", "sobre ortofoto e reconstituição")):
        draw.text((150, 1212 + i * 36), text, fill=(248, 250, 252, 205 if i == 0 else 145))
    canvas = Image.alpha_composite(canvas, label)

    canvas = add_vignette(canvas, strength=0.38)
    canvas = add_grain(canvas, amount=10)
    return canvas


def build_regularizacao() -> Image.Image:
    base = open_image("implantacao_loteamento_empresarial_darci_zatta.png")
    bg = cover(base, CANVAS, focus=(0.48, 0.35))
    bg = grade(bg, saturation=0.72, contrast=1.08, brightness=0.86, black_overlay=0.08)

    warm = Image.new("RGBA", CANVAS, (251, 146, 60, 0))
    warm = add_radial_glow(warm, center=(0.24, 0.3), radius=0.44, color=(251, 146, 60), intensity=0.18)
    bg = Image.alpha_composite(bg, warm)
    bg = add_linear_overlay(bg, start_alpha=80, end_alpha=165, horizontal=True, reverse=False)

    plan = remove_white(open_image("urbanistico_proposto_loteamento_popular_amorim.png"), threshold=242, soften=3)
    plan = grade(plan, saturation=0.78, contrast=1.1, brightness=1.02, black_overlay=0.0)
    plan = crop_box(plan, (70, 40, 3590, 3360))
    plan = cover(plan, (1120, 1120), focus=(0.52, 0.55))
    plan = ImageOps.expand(plan, border=22, fill=(244, 240, 227, 255))
    plan = add_shadow(plan, blur=28, offset=(0, 22), alpha=145)
    plan = plan.rotate(-11, expand=True, resample=Image.Resampling.BICUBIC)

    canvas = bg.copy()
    canvas.alpha_composite(plan, (1180, 130))

    detail = open_image("geometrico_proposto_loteamento_tangara.png")
    detail = grade(detail, saturation=0.76, contrast=1.12, brightness=0.9, black_overlay=0.0)
    detail = cover(detail, (540, 360), focus=(0.62, 0.45))
    detail = ImageOps.expand(detail, border=10, fill=(246, 241, 232))
    detail = add_shadow(detail, blur=18, offset=(0, 10), alpha=90)
    canvas.alpha_composite(detail.rotate(5, expand=True, resample=Image.Resampling.BICUBIC), (1440, 920))

    canvas = add_vignette(canvas, strength=0.34)
    canvas = add_grain(canvas, amount=9)
    return canvas


def build_assistencia() -> Image.Image:
    photo = open_image("foto_mapa_original_loteamento.jpg")
    bg = cover(photo, CANVAS, focus=(0.66, 0.26))
    bg = grade(bg, saturation=0.66, contrast=1.16, brightness=0.74, black_overlay=0.14)
    bg = add_radial_glow(bg, center=(0.32, 0.28), radius=0.22, color=(251, 191, 36), intensity=0.12)
    bg = add_linear_overlay(bg, start_alpha=70, end_alpha=170, horizontal=True, reverse=True)

    modern = open_image("levantamento_planimetrico_reconstituicao_loteamento.png")
    modern = crop_box(modern, (160, 200, 3600, 4200))
    modern = cover(modern, (980, 980), focus=(0.36, 0.42))
    modern = grade(modern, saturation=0.72, contrast=1.08, brightness=0.9, black_overlay=0.0)
    modern = ImageOps.expand(modern, border=14, fill=(232, 235, 238))
    modern = add_shadow(modern, blur=24, offset=(0, 18), alpha=115)
    modern = modern.rotate(-8, expand=True, resample=Image.Resampling.BICUBIC)

    cadastral = remove_white(open_image("mapa_colonial_lotes_originais.jpg"), threshold=241, soften=2)
    cadastral = grade(cadastral, saturation=0.58, contrast=1.1, brightness=0.96, black_overlay=0.0)
    cadastral = ImageOps.expand(cadastral, border=14, fill=(221, 198, 160, 255))
    cadastral = add_shadow(cadastral, blur=20, offset=(0, 14), alpha=90)
    cadastral = cadastral.rotate(7, expand=True, resample=Image.Resampling.BICUBIC)

    canvas = bg.copy()
    canvas.alpha_composite(modern, (1210, 140))
    canvas.alpha_composite(cadastral.resize((760, 690), Image.Resampling.LANCZOS), (1540, 830))

    draw = ImageDraw.Draw(canvas)
    draw.line((1080, 410, 1410, 515), fill=(110, 231, 183, 105), width=3)
    draw.ellipse((1048, 378, 1112, 442), outline=(110, 231, 183, 170), width=3)
    draw.ellipse((1380, 485, 1444, 549), outline=(110, 231, 183, 170), width=3)

    canvas = add_vignette(canvas, strength=0.42)
    canvas = add_grain(canvas, amount=11)
    return canvas


def build_infraestrutura() -> Image.Image:
    base = Image.new("RGBA", CANVAS, ImageColor.getrgb("#07101e") + (255,))
    base = add_radial_glow(base, center=(0.72, 0.42), radius=0.36, color=(74, 222, 128), intensity=0.08)
    base = add_radial_glow(base, center=(0.26, 0.62), radius=0.28, color=(110, 231, 183), intensity=0.05)

    model_main = remove_white(open_image("perspectiva_3d_terraplenagem_loteamento_formosa.png"), threshold=243, soften=2)
    model_main = grade(model_main, saturation=0.78, contrast=1.16, brightness=0.84, black_overlay=0.0)
    model_main = model_main.resize((1960, 708), Image.Resampling.LANCZOS)

    model_secondary = remove_white(open_image("modelo_3d_terraplenagem_via_atacadista_efapi.png"), threshold=245, soften=2)
    model_secondary = tint(model_secondary, "#4ADE80", 0.08)
    model_secondary = grade(model_secondary, saturation=0.6, contrast=1.1, brightness=0.74, black_overlay=0.0)
    model_secondary = model_secondary.resize((1460, 820), Image.Resampling.LANCZOS)
    model_secondary.putalpha(model_secondary.getchannel("A").point(lambda p: int(p * 0.22)))

    canvas = base.copy()
    canvas.alpha_composite(model_secondary, (880, 220))
    canvas.alpha_composite(add_shadow(model_main, blur=34, offset=(0, 24), alpha=135), (370, 430))

    grid = Image.new("RGBA", CANVAS, (0, 0, 0, 0))
    draw = ImageDraw.Draw(grid)
    for x in range(0, CANVAS[0], 128):
        draw.line((x, 0, x, CANVAS[1]), fill=(74, 222, 128, 14), width=1)
    for y in range(0, CANVAS[1], 128):
        draw.line((0, y, CANVAS[0], y), fill=(74, 222, 128, 14), width=1)
    canvas = screen_blend(canvas, grid, opacity=0.55)

    canvas = add_linear_overlay(canvas, start_alpha=160, end_alpha=20, horizontal=True, reverse=False)
    canvas = add_vignette(canvas, strength=0.38)
    canvas = add_grain(canvas, amount=8)
    return canvas


def build_ambiental() -> Image.Image:
    src = open_image("base_cartografica_municipio_marema_autha.jpg")
    aerial_crop = crop_box(src, (1120, 420, 7350, 5570))
    bg = cover(aerial_crop, CANVAS, focus=(0.64, 0.38))
    bg = grade(bg, saturation=0.74, contrast=1.08, brightness=0.88, black_overlay=0.1)
    bg = add_radial_glow(bg, center=(0.78, 0.24), radius=0.22, color=(251, 191, 36), intensity=0.06)
    bg = add_linear_overlay(bg, start_alpha=150, end_alpha=45, horizontal=True, reverse=False)

    thematic = crop_box(src, (2570, 6840, 4700, 8220))
    thematic = remove_white(thematic, threshold=243, soften=2)
    thematic = grade(thematic, saturation=0.84, contrast=1.08, brightness=1.0, black_overlay=0.0)
    thematic = ImageOps.expand(thematic, border=18, fill=(240, 243, 245, 255))
    thematic = add_shadow(thematic, blur=26, offset=(0, 16), alpha=125)
    thematic = thematic.resize((760, 496), Image.Resampling.LANCZOS)

    muni = crop_box(src, (980, 180, 7350, 6400))
    muni = remove_white(muni, threshold=238, soften=2)
    muni = grade(muni, saturation=0.74, contrast=1.06, brightness=0.98, black_overlay=0.0)
    muni = muni.resize((980, 980), Image.Resampling.LANCZOS)
    muni.putalpha(muni.getchannel("A").point(lambda p: int(p * 0.24)))

    canvas = bg.copy()
    canvas.alpha_composite(muni, (1450, 100))
    canvas.alpha_composite(thematic, (1480, 840))
    canvas = add_vignette(canvas, strength=0.4)
    canvas = add_grain(canvas, amount=9)
    return canvas


def main() -> None:
    ensure_dirs()

    hero = build_hero()
    save(hero, "hero-drone-cidade.jpg")
    save(cover(hero, (1200, 630), focus=(0.55, 0.18)), "og-image.jpg")

    assets = {
        "manifesto-authagraph.jpg": build_manifesto(),
        "mapeamento-lidar-pointcloud.jpg": build_mapeamento(),
        "regularizacao-golden-hour.jpg": build_regularizacao(),
        "assistencia-pericia-mapa.jpg": build_assistencia(),
        "infraestrutura-bim-lidar.jpg": build_infraestrutura(),
        "ambiental-mata-atlantica.jpg": build_ambiental(),
    }

    for name, image in assets.items():
        save(image, name)


if __name__ == "__main__":
    main()
