<script lang="ts">
	import "/src/app.css";
	import favicon from "$lib/assets/favicon.png";
	import { onMount, onDestroy } from "svelte";
	import { browser } from "$app/environment";
	import { page } from "$app/state";
	import articles from "$lib/articles";
	import { resources, subjectUrl, article } from "$lib/stores/store";
	import Viewer from "$lib/components/viewer.svelte";

	$article = (articles as any)[page.params.slug ?? ""] ?? {};
	const { title, description } = $article;

	const load = async (url: string) => {
		if (!browser) return "";
		const response = await fetch(url);
		const buffer = await response.arrayBuffer();
		return URL.createObjectURL(new Blob([buffer]));
	};

	onMount(async () => {
		if ($subjectUrl && $resources[$subjectUrl] === undefined) {
			$resources[$subjectUrl] = null;
			$resources[$subjectUrl] = await load($subjectUrl);
		}
		for (let line of $article.lines) {
			const { subjectUrl, imgUrl } = line as any;
			if (subjectUrl && $resources[subjectUrl] === undefined) {
				$resources[subjectUrl] = null;
				$resources[subjectUrl] = await load(subjectUrl);
			}
			if (imgUrl && $resources[imgUrl] === undefined) {
				$resources[imgUrl] = null;
				$resources[imgUrl] = await load(imgUrl);
			}
		}
	});

	onDestroy(() => {
		URL.revokeObjectURL($resources[$subjectUrl] ?? "");
		$article.lines.forEach((line: any) => {
			const { imgUrl } = line;
			URL.revokeObjectURL(imgUrl ?? "");
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
	<title>{`${title}📍你還願意看的部落格`}</title>
	<meta name="description" content={description} />

	<!-- Open Graph Protocol -->
	<meta property="og:title" content={`${title}📍你還願意看的部落格`} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content="og-image.jpg" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="📍你還願意看的部落格" />

	<!-- Twitter Cards -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={`${title}📍你還願意看的部落格`} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content="og-image.jpg" />
</svelte:head>

{#if !resizing}
	<Viewer />
{/if}
