#!/usr/bin/env python3
"""Baja el calendario de contribuciones de GitHub a assets/github-calendario.json."""
import json
import os
import pathlib
import urllib.request
from datetime import date

USUARIO = "iamluisgb"
QUERY = """query($u: String!) { user(login: $u) { contributionsCollection { contributionCalendar {
  totalContributions weeks { contributionDays { date contributionCount contributionLevel } } } } } }"""
NIVEL = {"NONE": 0, "FIRST_QUARTILE": 1, "SECOND_QUARTILE": 2, "THIRD_QUARTILE": 3, "FOURTH_QUARTILE": 4}
DESTINO = pathlib.Path(__file__).resolve().parents[2] / "assets" / "github-calendario.json"

pet = urllib.request.Request(
    "https://api.github.com/graphql",
    data=json.dumps({"query": QUERY, "variables": {"u": USUARIO}}).encode(),
    headers={"Authorization": f"bearer {os.environ['GH_TOKEN']}", "Content-Type": "application/json"},
)
with urllib.request.urlopen(pet, timeout=30) as r:
    res = json.load(r)
if res.get("errors"):
    raise SystemExit(f"GraphQL: {res['errors']}")

cal = res["data"]["user"]["contributionsCollection"]["contributionCalendar"]
dias = [d for s in cal["weeks"] for d in s["contributionDays"]]
inicio = dias[0]["date"]
if date.fromisoformat(inicio).isoweekday() != 7:
    raise SystemExit(f"El calendario debe empezar en domingo y empieza el {inicio}")

DESTINO.write_text(json.dumps({
    "total": cal["totalContributions"],
    "inicio": inicio,
    "cuentas": [d["contributionCount"] for d in dias],
    "niveles": [NIVEL[d["contributionLevel"]] for d in dias],
}, separators=(",", ":")) + "\n")
print(f"{cal['totalContributions']} contribuciones, {len(dias)} días desde {inicio}")
