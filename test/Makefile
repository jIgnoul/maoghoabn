.PHONY: verify

LOGFILE = test_results.log

verify:
	@rm -f $(LOGFILE)
	@nohup node verify.js > $(LOGFILE) 2>&1 & disown; \
	echo "Tests running in background"; \
	echo "Watch live:  tail -f $(LOGFILE)"; \
	echo "Full results: cat $(LOGFILE)"