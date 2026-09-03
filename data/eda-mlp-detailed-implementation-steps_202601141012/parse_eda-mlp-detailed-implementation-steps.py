import os
import sys

from agentic_graph_parser import markdown_cmd

def main() -> int:
    github_root = os.environ.get('GITHUB_ROOT', os.path.expanduser('~/Documents/GitHub'))
    markdown_path = os.path.abspath(os.path.join(github_root, 'joohwee/guidelines-archive/eda-mlp-detailed-implementation-steps.md'))
    argv = ['--input', markdown_path] + sys.argv[1:]
    return markdown_cmd.main(argv)

if __name__ == '__main__':
    raise SystemExit(main())
