export default function Footer() {
  return (
    <footer className="py-12 border-t border-gray-200 text-center">
      <p className="text-[13px] text-gray-400">
        &copy; {new Date().getFullYear()} Tile Text. All rights reserved.
      </p>
    </footer>
  );
}
