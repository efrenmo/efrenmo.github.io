/**
 * Portfolio items — render order matches array order.
 * Reorder: move entries up or down in this list.
 * Add: append a new object. Remove: delete the entry (or set enabled: false).
 * Description: a string, or an array of strings (each entry is its own paragraph).
 * Images: optional `images` array (paths from the site root). Idle cards cycle these
 * in list order; hover pauses and shows the title overlay. Omit `images` to keep
 * the SVG placeholder. Optional `imageInterval` (ms) overrides the default pace.
 */
const PORTFOLIO_ITEMS = [
    {
        title: "Luxury Watch Market Analytics",
        description: [
            "Production ETL pipeline with Apache Airflow and AWS processing 50+ data sources, transforming raw data into curated market intelligence.",
            "Built a multi-layered financial metrics engine covering price trend analysis, volatility modeling, and growth rate tracking — generating reports and exploratory analyses consumed by platform subscribers.",
        ],
        images: [
            "elements/watch_market_analytics_prjct_imgs/docker-airflow-architecture-314mini.drawio.svg",
            "elements/watch_market_analytics_prjct_imgs/website_screenshot_rolex_Part1.svg",
            "elements/watch_market_analytics_prjct_imgs/website_screeenshot_rolex_2_Tapered.svg",            
        ],
    },
    {
        title: "Data Warehouse Consolidation",
        description:
            "Unified data warehouse using dbt, Airbyte, and Snowflake consolidating fragmented sources with comprehensive transformation pipelines.",
    },
    {
        title: "NLP Content Classification",
        description:
            "Machine learning pipeline processing 100K+ daily posts with automated content classification and sentiment analysis.",
    },
    {
        title: "Real-Time Analytics Dashboard",
        description:
            "Interactive Tableau and Streamlit dashboards for real-time business intelligence with automated reporting and KPI tracking.",
    },
    {
        title: "Data Quality Framework",
        description:
            "Automated data quality monitoring with validation rules, anomaly detection, and alerting for production pipeline reliability.",
    },
    {
        title: "Cloud Infrastructure Migration",
        description:
            "AWS cloud migration with optimized infrastructure reducing costs by 40% and improving processing performance by 60%.",
    },
];
