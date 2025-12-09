<script lang="ts">
	import "/src/app.css";
	import favicon from "$lib/assets/favicon.png";
	import { onMount, onDestroy } from "svelte";
	import { browser } from "$app/environment";
	import { page } from "$app/state";
	import { pages, resources, activePage } from "$lib/stores/store";
	import articles from "$lib/articles";
	import Viewer from "$lib/components/viewer.svelte";

	const article = (articles as any)[page.params.slug ?? ""] ?? {};
	const { title, description } = article;
	$pages = article.pages ?? [];

	const load = async (url: string) => {
		if (!browser) return "";
		const response = await fetch(url);
		const buffer = await response.arrayBuffer();
		return URL.createObjectURL(new Blob([buffer]));
	};

	onMount(async () => {
		for (let page of $pages) {
			if ($resources[page.url] === undefined) {
				$resources[page.url] = null;
				$resources[page.url] = await load(page.url);
			}
			for (let line of page.lines) {
				const { imgUrl, videoUrl } = line as any;
				if (imgUrl && $resources[imgUrl] === undefined) {
					$resources[imgUrl] = null;
					$resources[imgUrl] = await load(imgUrl);
				}
				if (videoUrl && $resources[videoUrl] === undefined) {
					$resources[videoUrl] = null;
					$resources[videoUrl] = await load(videoUrl);
				}
			}
		}
	});

	onDestroy(() => {
		$pages.forEach((page) => {
			URL.revokeObjectURL($resources[page.url] ?? "");
			page.lines.forEach((line) => {
				const { imgUrl, videoUrl } = line as any;
				URL.revokeObjectURL(imgUrl ?? "");
				URL.revokeObjectURL(videoUrl ?? "");
			});
		});
	});

	let resizing = $state(false);
	let resizeTimeout: ReturnType<typeof setTimeout>;

	onMount(() => {
		if (!browser) return;

		window?.addEventListener("resize", () => {
			resizing = true;
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(() => {
				resizing = false;
			}, 750);
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{`${title}(^ω^)祥平的玩具櫃`}</title>
	<meta name="description" content={description} />

	<!-- Open Graph Protocol -->
	<meta property="og:title" content={`${title}(^ω^)祥平的玩具櫃`} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content="og-image.jpg" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="(^ω^)祥平的玩具櫃" />

	<!-- Twitter Cards -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={`${title}(^ω^)祥平的玩具櫃`} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content="og-image.jpg" />
</svelte:head>

{#if !resizing && $activePage}
	{#key $activePage}
		<Viewer />
	{/key}
{/if}
